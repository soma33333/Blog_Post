import React, { useState, useEffect } from "react";

import "./css/Header.css";
import axios from "axios";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Header = ({ isLoggedIn, setIsLoggedIn }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        // Make a request to the backend to check login status
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
  }, []); // Empty dependency array means this effect runs once on mount

  const handle_logout = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/auth/logout",
        {},
        { withCredentials: true },
      );
      navigate("/"); // Redirect to login after logout

      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  const handlesearch=()=>{
    navigate("/search")
  }

  return (
    <>
      <div>
        <div>
          {" "}
          <Link to="/"  className="link">
            <h2 className="Project_name">Project_Insight</h2>
          </Link>
        </div>
        <div className="header">
          {isLoggedIn ? (
            <>
              <Link to="/createnewpost"  className="button-link">Create new post</Link>
              <button onClick={handlesearch} className="button-link">Search post</button>
              <button onClick={handle_logout} className="button-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"  className="button-link">login</Link>
              <button onClick={handlesearch} className="button-link">Search post</button>
              <Link to="/register" className="button-link">register</Link>
            </>
          )}
        </div>
      </div>

      <Outlet />
    </>
  );
};

export default Header;
