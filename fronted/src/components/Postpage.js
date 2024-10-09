import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import axios from 'axios';
import './css/Postpage.css'

const Postpage = () => {
    const { id } = useParams();
    const [post, setPosts] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [user,setuser]=useState(null)



    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get(`http://localhost:5000/api/auth/post/${id}`,{withCredentials: true,});
                setPosts(response.data.post); // Set the posts state with the fetched posts
                setuser(response.data.user)
            } catch (error) {
                console.error('Error fetching posts:', error);
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
        return <div>Error: {<h2>Please Login to view this post</h2>}</div>;
    }


    return (
        <div className="post-container">
            {user.id==post.author._id  && <> 
            <Link to={`/edit/${post._id}`}>Edit post</Link>
            </>}

        {post ? (
            <>
                <div className="image">
                    <img src={`http://localhost:5000/${post.image}`} alt={post.title} />
                </div>
                <h1>{post.title}</h1>
                <p className="author"><strong>Author:</strong> {post.author.name}</p>
                <p className="created-at">Created At: {new Date(post.updatedAt).toLocaleDateString()}</p>
                <p>{post.summary}</p>
            </>
        ) : (
            <div>No post found.</div>
        )}
    </div>
    );
};

export default Postpage;
