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



import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../api';

function RequestorSearch() {
  const [requestorName, setRequestorName] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.get("/ISDs"); 
      const isds = res.data.data;
  
      //if requestor is found
      const isdMatch = isds.find(
        (item) => item.requestor_name === requestorName.trim()
      );
  
      if (isdMatch) {
        const encodedName = encodeURIComponent(requestorName.trim());
        navigate(`/ISDs?requestor=${encodedName}`, {
          state: { requestorName },
        });
      } else {
        alert("Requestor not found in ISD list.");
      }
    } catch (err) {
      console.error("Error fetching ISDs:", err);
    }
  };
  

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <div className="input-container">
          <input
            id="requestor_search"
            type="text"
            name="requestor_search"
            data-cy="requestor_search"
            placeholder="Requestor Name"
            value={requestorName}
            onChange={(e) => setRequestorName(e.target.value)}
            className="input-field"
          />
        </div>
        <input 
        type="submit" 
        data-cy="requestor_submit"
        value="Search" 
        className="submit-button" />
      </form>
    </div>
  );
}

export default RequestorSearch;
