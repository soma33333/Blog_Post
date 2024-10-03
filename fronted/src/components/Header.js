import React, { useState ,useEffect} from 'react';

import './css/Header.css'
import axios from 'axios';
import { Link } from 'react-router-dom';
import Logout from './Logout';
import Home from './Home';
const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Make a request to the backend to check login status
        const response = await axios.get('http://localhost:5000/api/auth/protected', {
          withCredentials: true, // Include cookies in the request
        });
        if (response.status === 200) {
          setIsLoggedIn(true); // User is logged in
        }
      } catch (error) {
        console.error('Not logged in:', error.response ? error.response.data.message : 'Error occurred');
      }
    };

    checkLoginStatus(); // Call the function to check login status
  }, []); // Empty dependency array means this effect runs once on mount


  return (
    <>
        <div>
            <div> <Link  to="/"><h2>Soma_home</h2></Link></div>
            <div className='header'> 
              {isLoggedIn ?
              (<><Link to="logout"><Logout/></Link> 
              
              </>    ):
              (<><Link to="/login">login</Link>
               <Link to="/register">register</Link>
              </>)
                
               }
              
            </div>
        </div>
     
      
    </>
  )
}

export default Header
