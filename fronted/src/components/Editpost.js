import React, { useState, useEffect } from "react";
import axios from "axios";
import "./css/newpost.css";
import { useNavigate, useParams } from "react-router-dom";

const Editpost = () => {
  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  const { id } = useParams();
  const [title, setTitle] = useState("");
  const [summary, setSummary] = useState("");
  const [error, setError] = useState(null);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleupdate = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("summary", summary);
    if (image) {
      formData.append("image", image);
    }

    try {
      // Send POST request using axios
      const response = await axios.put(
        `http://localhost:5000/api/auth/post/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          withCredentials: true,
        },
      );
      // Handle success
      setMessage("Form submitted successfully!");
      console.log("Response:", response.data);

      // Reset form after submit
      setTitle("");
      setSummary("");
      setImage(null);
      navigate("/");
    } catch (error) {
      // Handle error
      setMessage("Form submission failed.");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/post/${id}`,
          { withCredentials: true },
        );
        setTitle(response.data.post.title);
        setSummary(response.data.post.summary);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        // Stop loading whether the request succeeded or failed
      }
    };

    fetchPosts();
  }, [id]);

  return (
    <div>
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
            <input type="file" accept="image/*" onChange={handleImageChange} />
          </div>

          <button type="submit">Update</button>
        </form>
      </div>

      <>{message}</>
    </div>
  );
};

export default Editpost;
