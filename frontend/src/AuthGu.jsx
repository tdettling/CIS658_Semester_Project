/*

L Dettling 
CIS 658 Project

Sources for this file:
https://dev.to/egnoel/how-to-verify-jwt-token-expiry-in-reactnext-22dn

Supplemenarty:
https://github.com/auth0/jwt-decode/issues/53
https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library

*/

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { isAuthenticated } from './auth';

const AuthGu = () => {
  const [authChecked, setAuthChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated()) {
      navigate('/');
    } else {
        const token = localStorage.getItem('token');

      setAuthChecked(true);
    }
  }, [navigate]);

  return authChecked;
};

export default AuthGu;
