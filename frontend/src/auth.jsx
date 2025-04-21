/*

L Dettling 
CIS 658 Project

Sources for this file:
https://dev.to/egnoel/how-to-verify-jwt-token-expiry-in-reactnext-22dn

Supplemenarty:
https://github.com/auth0/jwt-decode/issues/53
https://stackoverflow.com/questions/51292406/check-if-token-expired-using-this-jwt-library

https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state

*/
import { jwtDecode } from 'jwt-decode';

export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  console.log("Token in localStorage:", token);

  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const currentTime = Date.now() / 1000;

    if (decoded.exp && decoded.exp < currentTime) {
      localStorage.removeItem('token');
      return false;
    }

    return true;
  } catch (error) {
    localStorage.removeItem('token');
    return false;
  }
};
