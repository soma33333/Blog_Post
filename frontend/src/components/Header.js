import React, { useState, useEffect } from "react";
import "./css/Header.css";
import { useAuth } from "../context/AuthContext"; 
import axios from "axios";
import { Link, useNavigate, Outlet } from "react-router-dom";


const Header = () => {
  
  const { isLoggedIn, setIsLoggedIn } = useAuth();
  const  {user,setUser}=useAuth();
  const navigate = useNavigate();

  const handle_logout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}/api/logout`,
        {},
        { withCredentials: true },
      );
      navigate("/"); 

      setIsLoggedIn(false);
    } catch (error) {
      console.error("Logout failed", error);
    }
  };

  // useEffect(()=>{


  // },[name])

  
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
              <h3>Profile_name :{user.name}</h3>
              <button onClick={handle_logout} className="button-link">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login"  className="button-link">login</Link>
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
