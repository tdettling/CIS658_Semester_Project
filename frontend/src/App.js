/*
L Dettling 
CIS 658 Project

Sources for this file:

https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state

*/

import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'; 

import './App.css';

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
import CreateNewISD from './Pages/CreateNewISD'
import ViewPO from './Pages/ViewPO';

import Login from './Pages/Login';
import ProtectedPage from './Components/ProtectedPage';
import UsersSmallComp from './Components/UsersSmallComp';
import ProtectedRoute from './Components/ProtectedRoute';
import Register from './Pages/Register';
import Weather from './Components/Weather';



function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";
  const isRegisterPage = location.pathname === "/Register";
  const isAuthPage = isLoginPage || isRegisterPage;


  return (
    <div className="app-container">
      {!isAuthPage && <Sidebar />}

      <div className="main-content">
        {!isAuthPage && (
          <header className="header">
            <h1 className="main-title">
              Technology Acquisition <span className="turbo-highlight">TURBO</span>
            </h1>
            <div className="header-widgets">
              <Weather />
              <UsersSmallComp />
            </div>
          </header>
        )}



        <div className="content-area">
          <Routes> 
            <Route path="/" element={<Login />} />

           

            <Route path="/Register" element={<Register />} />
          

          <Route path="/protected" element={<ProtectedPage />} />
            <Route
              path="/Home"
              element={
                <ProtectedRoute>
                  <HomeScreen />
                </ProtectedRoute>
              }
              />
                <Route
                path="/inventory"
                element={
                  <ProtectedRoute>
                    <ShowInventory />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/Users"
                element={
                  <ProtectedRoute>
                    <Users />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/ItemsToOrder"
                element={
                  <ProtectedRoute>
                    <ItemsToOrder />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/ISDs"
                element={
                  <ProtectedRoute>
                    <OrderFufillment />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/ISDs/new"
                element={
                  <ProtectedRoute>
                    <CreateNewISD />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/Settings"
                element={
                  <ProtectedRoute>
                    <ITP_Settings />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/inventory/new"
                element={
                  <ProtectedRoute>
                    <CreateStockItem />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/ISDs/:isd_number"
                element={
                  <ProtectedRoute>
                    <IsdFufill />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/inventory/edit/:stock_id"
                element={
                  <ProtectedRoute>
                    <EditStock />
                  </ProtectedRoute>
                }
                />
                <Route
                path="/inventory/PO/:po_number"
                element={
                  <ProtectedRoute>
                    <ViewPO />
                  </ProtectedRoute>
                }
                />


            </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;