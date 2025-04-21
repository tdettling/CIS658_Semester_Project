/*
L Dettling 
CIS 658 Project

Sources for this file:


*/

import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';


import OrdersPreview from '../Components/OrdersPreview';
import SearchHomepage from '../Components/SearchHomepage';

import ISDSearch from '../Components/SearchComponents/ISDSearch';
import POSearch from '../Components/SearchComponents/POSearch';
import RequesterSearch from '../Components/SearchComponents/RequesterSearch';
import SerialNumberSearch from '../Components/SearchComponents/SerialNumberSearch';

const HomeScreen = () => {
  const navigate = useNavigate();
 
  return (
    <div>
    <div className="search-bar-group">
      <ISDSearch />
      <POSearch />
      <RequesterSearch />
    </div>

      <OrdersPreview />

    </div>
  );
}

export default HomeScreen;