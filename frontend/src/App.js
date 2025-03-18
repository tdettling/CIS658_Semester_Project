
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; 

/*
L Dettling
CIS 658
React Parts 1 and 2

PSA: I am slightly familer with React! It has been a while, but we do very similar things in my mobile apps class right now as well. 

for Routing - https://www.w3schools.com/react/react_router.asp
*/

import './App.css';

// gotta grab my compnent
import DisplayInventory from './Components/DisplayInventory';
import ShowInventory from './Pages/ShowInventory';
import HomeScreen from './Pages/Homescreen';



function App() {
  return (
    <Router>
      <Routes> 
        <Route path="/" element={<HomeScreen />} />
        <Route path="/inventory" element={<ShowInventory />} />
      </Routes>
    </Router>
  );
}

export default App;
