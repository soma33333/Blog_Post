import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/newpost.css";
import { useNavigate, useParams } from "react-router-dom";

const Editpost = () => {
  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  // Fetch post details on mount to pre-fill the form
  useEffect(() => {
    const fetchPostData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getpostbyid/${id}`,
          { withCredentials: true }
        );
        const post = response.data.post;
        setTitle(post.title);
        setSummary(post.summary);
        // If there's an image URL or path, store it to display
        setImage(post.image); // Assuming post.image contains the image URL or path
      } catch (error) {
        setError("Error fetching post details.");
        console.error("Error:", error);
      }
    };

    fetchPostData();
  }, [id]);

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const handleupdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    if (image) {
      formData.append("image", image);
    }

    try {
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/update_post/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        }
      );
      setMessage("Post updated successfully!");
      console.log("Response:", response.data);

      setTitle("");
      setSummary("");
      setImage(null);
      navigate("/"); // Navigate to another page, such as home or post list
    } catch (error) {
      setMessage("Post update failed.");
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleupdate}>
        <div>
          <label>Title:</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Summary:</label>
          <textarea
            value={summary}
            onChange={(e) => setSummary(e.target.value)}
            required
          />
        </div>

        <div>
          <label>Image:</label>
          {/* Display existing image if available */}
          {image && (
            <div>
              <img
                src={`${process.env.REACT_APP_API_URL}/${image}`}
                alt="Current Post Image"
                style={{ width: "200px", height: "auto", marginBottom: "10px" }}
              />
            </div>
          )}
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </div>

        <button type="submit">Update</button>
      </form>

      {message && <p>{message}</p>}
      {error && <p>{error}</p>}
    </div>
  );
};

export default Editpost;
