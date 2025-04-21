/*
L Dettling 
CIS 658 Project

Sources for this file:
https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library

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
