import React, { useEffect, useState } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import "./css/Postpage.css";
import { useAuth } from "../context/AuthContext";

const Postpage = () => {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [Contributer, setContributer] = useState(null);
  const navigate = useNavigate(); 
  const { isLoggedIn, setIsLoggedIn } = useAuth();

 const handledelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");
  
  if (confirmed) {
    try {
      console.log("fghjk",id)
      await axios.delete(`${process.env.REACT_APP_API_URL}/api/delete_post/${id}`, {
        withCredentials: true,
      });
      // After successful deletion, navigate back to the posts list
      alert('Post deleted  ...')
      navigate("/");

    } catch (error) {
      console.log("sd")
      console.error("Error deleting post:", error);
      setError("Failed to delete the post.");
    }
  }
};


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/getpostbyid/${id}`,
          { withCredentials: true },
        );
        setPosts(response.data.post); // Set the posts state with the fetched posts
        setContributer(response.data.Contributer);
      } catch (error) {
        console.error("Error fetching posts:", error);
        setError(error.message);
      } finally {
        setLoading(false); // Stop loading whether the request succeeded or failed
      }
    };

    fetchPosts();
  }, [id]); // Add id to the dependency array

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{<h2 style={{top:'500px'}}>Please Login to view this post</h2>}</div>;
  }

  return (
    <div className="post-container">
      {Contributer.id == post.Contributer._id && (
        <div className="edit-dlt">
          <Link className="button-link" to={`/edit/${post._id}`}><h2>Edit post</h2> </Link>
          <Link className="button-link" to={`/contact/${post._id}`}><h2>Contact</h2></Link>
          <button className="button-link" onClick={handledelete}><h2>Delete post</h2></button>
        </div>
        
        
        
      )}

      {post ? (
        <>
          <Link className="button-link" to={`/contact/${post._id}`}><h2>Contact</h2></Link>
          <div className="image">
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
          </div>
          <h1>{post.title}</h1>
          <p className="author">
            <strong>Contributer:</strong> {post.Contributer.name}
          </p>
          <p className="created-at">
            Created At: {new Date(post.updatedAt).toLocaleDateString()}
          </p>
          <p>{post.summary}</p>
        </>
      ) : (
        <div>No post found.</div>
      )}
    </div>
  );
};

export default Postpage;
