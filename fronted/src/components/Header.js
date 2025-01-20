import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import { Link, useNavigate, Outlet } from "react-router-dom";

const Header = () => {
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/post/protected`,
          {
            withCredentials: true,
          },
        );
        if (response.status === 200) {
          setIsLoggedIn(true);
        }
      } catch (error) {
        console.error(
          "Not logged in:",
          error.response ? error.response.data.message : "Error occurred",
        );
      }
    };

    checkLoginStatus(); 
  }, []);

  const handle_logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/user/logout`,
        {},
        { withCredentials: true },
      );
      navigate("/"); 

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
