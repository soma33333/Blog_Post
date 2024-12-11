import React from "react";
import "./css/Post.css";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, image, updatedAt, author }) => {
  const imageUrl = `http://localhost:5000/${image}`;
  const formattedCreatedAt = new Date(updatedAt).toLocaleDateString();
  return (
    <div>
      <div className="container">
        <Link to={`post/${_id}`}>
          <div className="imag">
            <img src={imageUrl} alt={title} />
          </div>
        </Link>

        <div className="info">
          <Link style={{ textDecoration: "none" }} to={`post/${_id}`}>
            <h1>title:{title}</h1>
          </Link>
          <h3 className="truncated">Summary : {summary}</h3>
          <h3>Created At :{formattedCreatedAt}</h3>
          <h3>author :{author.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
