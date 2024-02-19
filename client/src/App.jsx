import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { UserContext } from "../userContext";
import Chat from "../Components/chat/Chat";
import Home from "../Components/home/Home";
import Navbar from "../Components/layout/Navbar";
import Login from "../Components/auth/Login";
import Signup from "../Components/auth/Signup";

function App() {
  const [user, setUser] = useState(null)

  return (
      <Router>
        <div className="App">
          <UserContext.Provider value={{user, setUser}}>
            <Navbar/>
            <Routes>
              <Route exact path="/" element={ <Home/> }/>
              <Route exact path="/chat" element={ <Chat/> }/>
              <Route exact path="/login" element={ <Login/> }/>
              <Route exact path="/signup" element={ <Signup/> }/>
              <Route exact path="/chat/:room_id/:room_name" element={ <Chat/> }/>
            </Routes>
          </UserContext.Provider>
        </div>
      </Router>
  )
}

export default App
