
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
import ItemsToOrder from './Pages/ItemsToOrder'
import OrderFufillment from './Pages/OrderFufillment';
import Users from './Pages/Users';
import ITP_Settings from './Pages/ITP_Settings';
import EditStock from './Pages/EditStock';
import CreateStockItem from './Pages/CreateStockItem';
import IsdFufill from './Pages/IsdFufill';


function App() {
  return (
    <Router>
      <div className="app-container">

        <div className="content-area">
          <Routes> 
            <Route path="/" element={<HomeScreen />} />
            <Route path="/inventory" element={<ShowInventory />} />
            <Route path="/Users" element={<Users />} />
            <Route path="/ItemsToOrder" element={<ItemsToOrder/>} />
            <Route path="/ISDs" element={<OrderFufillment/>} />
            <Route path="/Settings" element={<ITP_Settings/>} />
            <Route path="/ISDs/:isd_number" element={<IsdFufill/>} />
            <Route path="/inventory/edit/:stock_id" element={<EditStock/>} />
            <Route path="/inventory/new" element={<CreateStockItem/>} />
          </Routes>
        </div>

        <Sidebar />
      </div>
    </Router>
  );
}
export default App;
