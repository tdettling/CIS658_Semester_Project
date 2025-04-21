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

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import api from '../api';


import { FaUserGraduate } from "react-icons/fa";

function UsersSmallComp() {
  const [userData, setUserData] = useState({});

  const navigate = useNavigate();


  useEffect(() => {
    api.get(`/user/profile`)
      .then((res) => {
        setUserData(res.data);
        console.log('User data:', res.data);
      })
      .catch((err) => console.error(err));
  }, []);

  const handleClick = () => {
    navigate('/Users')
  };

  return (
    <div className="user-profile-button" onClick={handleClick}>
      <div className="user-icon">
      <FaUserGraduate />
      </div>
      <span className="username">{userData.username}</span>
    </div>
  );
}

export default UsersSmallComp;
