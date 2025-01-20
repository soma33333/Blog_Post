import React, { useState } from "react";
import "./css/Search.css";
import axios from "axios";
import Post from "./Post";

const SearchPost = () => {
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState("");
  const [search, setSearch] = useState(false);

  const handleSearch = async () => {
    setError(""); 
    try {
      const response = await axios.post(
       `${process.env.REACT_APP_API_URL}/api/post/search  `,
        { title,author }, { withCredentials: true }
      );
    setPosts(response.data.posts)
    setSearch(true); 
    } catch (error) {
      console.error("Error fetching posts:", error);
      setError("Failed to fetch posts. Please try again later.");
      setPosts(null);
    }
  };




  return (
    <>
      <div className="search-container">
        <label>Project Title:</label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Enter title"
        />
        <label>Project Author:</label>
        <input
          type="text"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          placeholder="Enter author"
        />
        <button onClick={handleSearch}>Search</button>
        {error && <div className="error-message">{error}</div>}
      </div>

      {search && (
        <div className="results-container">
          {posts && posts.length > 0 ? (
            <div className="Home">
              {posts.map((post) => (
                <Post key={post._id} {...post} /> 
              ))}
            </div>
          ) : (
            <div>No posts found matching the criteria.</div>
          )}
        </div>
      )}
    </>
  );
};

export default SearchPost;
