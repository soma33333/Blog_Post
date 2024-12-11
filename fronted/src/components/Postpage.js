import React, { useEffect, useState } from "react";
import { Link, useParams ,useNavigate} from "react-router-dom";
import axios from "axios";
import "./css/Postpage.css";

const Postpage = () => {
  const { id } = useParams();
  const [post, setPosts] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user, setuser] = useState(null);
  const navigate = useNavigate(); 

 const handledelete = async () => {
  const confirmed = window.confirm("Are you sure you want to delete this post?");
  
  if (confirmed) {
    try {
      await axios.delete(`http://localhost:5000/api/auth/post/${id}`, {
        withCredentials: true,
      });
      // After successful deletion, navigate back to the posts list
      alert('Post deleted  ...')
      navigate("/");

    } catch (error) {
      console.error("Error deleting post:", error);
      setError("Failed to delete the post.");
    }
  }
};


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/auth/post/${id}`,
          { withCredentials: true },
        );
        setPosts(response.data.post); // Set the posts state with the fetched posts
        setuser(response.data.user);
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
      {user.id == post.author._id && (
        <div className="edit-dlt">
          <Link className="button-link" to={`/edit/${post._id}`}><h2>Edit post</h2> </Link>
          
          <button className="button-link" onClick={handledelete}><h2>Delete post</h2></button>
        </div>
        
        
        
      )}

      {post ? (
        <>
          <div className="image">
            <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
          </div>
          <h1>{post.title}</h1>
          <p className="author">
            <strong>Author:</strong> {post.author.name}
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
