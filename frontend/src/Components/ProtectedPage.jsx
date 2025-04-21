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

function ProtectedPage() {
  const navigate = useNavigate();
  const [isValid, setIsValid] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate('/');
        return;
      }

      try {
        const response = await fetch("http://127.0.0.1:8000/verify-token", {
          method: 'GET',
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        setIsValid(true); 
      } catch (error) {
        localStorage.removeItem("token");
        navigate('/'); 
      }
    };

    verifyToken();
  }, [navigate]);

  if (!isValid) {
    return <p>Loading...</p>;
  }

  return (
    <div>
      <p>This is a protected page.</p>
    </div>
  );
}

export default ProtectedPage;
