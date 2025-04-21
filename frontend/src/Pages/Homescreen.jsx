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