// src/components/Logout.js
import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post('http://localhost:5000/api/auth/logout', {}, { withCredentials: true });
      navigate('/'); // Redirect to login after logout
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return <button onClick={handleLogout}>Logout</button>;
};

export default Logout;
