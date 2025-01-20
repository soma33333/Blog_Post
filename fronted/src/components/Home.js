import React, { useState, useEffect } from "react";

import axios from "axios";
import Post from "./Post";

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/post/getpost`,
        );
        setPosts(response.data); 
            console.log(posts);
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <div>
      <div className="Home">
        {posts.length > 0 &&
          posts.map((post) => (
            <Post key={post._id} {...post} /> 
          ))}
      </div>
    </div>
  );
};

export default Home;
