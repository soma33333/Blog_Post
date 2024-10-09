import React ,{useState,useEffect} from 'react'
import Header from './Header'

import axios from 'axios';
import Post from './Post'

const Home = () => {
  const [posts, setPosts] = useState([]);
  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/auth/getpost');
        setPosts(response.data); // Set the posts state with the fetched posts
        console.log(posts)
      } catch (error) {
        console.error('Error fetching posts:', error);
      }
    };

    fetchPosts();
  }, []); 
  return (
    <div>
      
        <div className='Home'> 
        {posts.length > 0 && posts.map(post => (
          <Post key={post._id} {...post} /> // Add a unique key prop
        ))}
      </div>
    </div>

  )
}

export default Home
