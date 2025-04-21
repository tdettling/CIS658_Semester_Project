/*
L Dettling 
CIS 658 Project

Sources for this file:
*/

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isAuthenticated } from '../auth';

const ProtectedRoute = ({ children }) => {
  const authed = isAuthenticated();
  console.log("ProtectedRoute - isAuthenticated():", authed);

  if (!authed) {
    console.log("Redirecting to / from protected route");
    return <Navigate to="/" replace />;
  }

  return children;
};


export default ProtectedRoute;
