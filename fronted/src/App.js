import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Home from './components/Home';
import Header from './components/Header';
import Createnewpost from './components/Createnewpost';
import React, { useState } from 'react';
import Postpage from './components/Postpage';
import Editpost from './components/Editpost';
import Search_post from './components/Search_post';
function App() {
  
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userdetails,setuserdeatails]=useState(null)
  return (

<>

<BrowserRouter>
<Routes>
    <Route path="/"  element={<Header  isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>}>
      <Route  index  element={<Home/>}/>
      <Route  path="login" element={<Login setIsLoggedIn={setIsLoggedIn}/>}/>
      <Route path='register' element={<Registration/>}/>
      <Route path='createnewpost' element={<Createnewpost/>}/>
      <Route path='post/:id'  element={<Postpage/>}/>
      <Route path='edit/:id'  element={<Editpost/>}/>
      <Route path='search'  element={<Search_post/>}/>
    </Route>
</Routes>

</BrowserRouter>

    
  </>
  )
}

export default App;
