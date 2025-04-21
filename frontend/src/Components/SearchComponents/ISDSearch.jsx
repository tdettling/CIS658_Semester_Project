/*
L Dettling 
CIS 658 Project

Sources for this file:
https://sentry.io/answers/html-text-input-allow-only-numeric-input/
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

function ISDSearch() {
  const [isdSearch, setIsdSearch] = useState('');
  const navigate = useNavigate();


  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      const res = await api.get("/ISDs"); 
      const isds = res.data.data;
  
     // if requestor is found
      const isdMatch = isds.find(
        (item) => item.isd_number == isdSearch
      );
      console.log("ISDs: ");
      console.log(res.data.data)
  
      if (isdMatch) {
    
        navigate(`/ISDs/${isdSearch}`);
      } else {
        alert("ISD not found in ISD list.");
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
            id="ISD_Search"
            type="number"
            name="isd_search"
            data-cy="isd_search"
            placeholder="ISD"
            value={isdSearch}
            onChange={(e) => setIsdSearch(e.target.value)}
            className="input-field"
          />
        </div>
        <input type="submit" value="Search" data-cy="isd_submit" className="submit-button" />
      </form>
    </div>
  );
}

export default ISDSearch;
