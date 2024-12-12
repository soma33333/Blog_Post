import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';

// Create the context
const AuthContext = createContext();

// Custom hook to use AuthContext
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

// Create the AuthProvider component
export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/auth/protected",
          {
            withCredentials: true, // Include cookies in the request
          },
        );
        if (response.status === 200) {
          setIsLoggedIn(true); // User is logged in
        }
      } catch (error) {
        console.error(
          "Not logged in:",
          error.response ? error.response.data.message : "Error occurred",
        );
      }
    };

    checkLoginStatus(); // Call the function to check login status
  }, []);

  return (
    <AuthContext.Provider value={{ isLoggedIn, setIsLoggedIn }}>
      {children}
    </AuthContext.Provider>
  );
};

