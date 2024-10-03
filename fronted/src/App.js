import './App.css';
import { BrowserRouter as Router, Routes, Route, BrowserRouter } from 'react-router-dom';
import Registration from './components/Registration';
import Login from './components/Login';
import Welcome from './components/Welcome';
import Home from './components/Home';
import Header from './components/Header';
function App() {
  return (
  <>
  <BrowserRouter>
  <Routes>
    {/* <Route path="/" element={<Registration/>}/>
    <Route path="login" element={<Login/>}/>
    <Route path="welcome" element={<Welcome/>}/> */}
    <Route  path="/" element={<Home/>}/>
    <Route  path="/register" element={
      <>
      <Header/>
      <Registration/>
      </>
    }/>
      <Route  path="/login" element={
      <>
      <Header/>
      <Login/>
        </>
    }/>

  </Routes>
  </BrowserRouter>
    
  </>
  )
}

export default App;
