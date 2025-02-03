import React from "react";
import "./css/Post.css";
import { Link } from "react-router-dom";

const Post = ({ _id, title, summary, image, updatedAt, Contributer }) => {
  const imageUrl = `${process.env.REACT_APP_API_URL}/${image}`;
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
          <h3>Contributer :{Contributer.name}</h3>
        </div>
      </div>
    </div>
  );
};

export default Post;
