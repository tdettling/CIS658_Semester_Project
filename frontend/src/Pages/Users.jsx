/*
L Dettling 
CIS 658 Project

Sources for this file:
https://create-react-app.dev/docs/adding-images-fonts-and-files/

https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/


import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';
import blank_user from '../Assets/blank_user.jpg';



const Users = () => {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();
  // grab user name, email, access
  useEffect(() => {
    api.get(`/user/profile`)
      .then((res) => {
        setUserData(res.data);
        console.log('User data:', res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href = '/';
  };
  
  
  return (
    <div>
      <img src={blank_user} alt="User Image" />;
      <h1>User Access</h1>
      <p>Username: {userData.username}</p>


      <button onClick={handleLogout}> 
      <p> Logout </p>
      </button>

    </div>
  );
}

export default Users;