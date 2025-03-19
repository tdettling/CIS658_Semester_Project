
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

/*
L Dettling
CIS 658
React Parts 1 and 2

PSA: I am slightly familer with React! It has been a while, but we do very similar things in my mobile apps class right now as well. 

for Routing - https://www.w3schools.com/react/react_router.asp
NavBar - https://www.youtube.com/watch?v=5R9jFHlG6ik
*/

import './App.css';

// gotta grab my compnent
//import DisplayInventory from './Components/DisplayInventory';
import ShowInventory from './Pages/ShowInventory';
import HomeScreen from './Pages/Homescreen';
import Sidebar from './Components/Sidebar';



function App() {
  return (
    <Router>
      <div className="app-container">

        <div className="content-area">
          <Routes> 
            <Route path="/" element={<HomeScreen />} />
            <Route path="/inventory" element={<ShowInventory />} />
          </Routes>
        </div>


        <Sidebar />
      </div>
    </Router>
  );
}
export default App;
