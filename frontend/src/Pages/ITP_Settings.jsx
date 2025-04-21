/*
L Dettling 
CIS 658 Project

Sources for this file:
https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library


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


const ITP_Settings = () => {
  const navigate = useNavigate();
  const [authChecked, setAuthChecked] = useState(false);



  if (!authChecked) return null;

  return (
    <div>
      <p>ITP_Settings</p>
    </div>
  );
};

export default ITP_Settings;
