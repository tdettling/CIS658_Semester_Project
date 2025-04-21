/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.youtube.com/watch?v=i8fAO_zyFAM
https://www.w3schools.com/react/react_useeffect.asp
https://react.dev/reference/react/useEffect
https://www.digitalocean.com/community/tutorials/react-axios-react
https://axios-http.com/docs/handling_errors
https://stackoverflow.com/questions/49967779/axios-handling-errors
https://www.w3schools.com/jsref/jsref_slice_array.asp
https://react.dev/learn/updating-arrays-in-state
*/




import React from 'react'

import { MdDelete } from "react-icons/md";

function DeletePopup(props) {
    return props.trigger ? (
      <div className="deletePopup">
        <div className="deletePopup-inner">
          {props.children}
          
          <div className="popup-buttons">
            <button
              className="confirm-btn"
              data-cy="confirm_delete"
              onClick={props.onConfirm}
            >
              Yes, I'm sure
            </button>
            
            <button
              className="cancel-btn"
              data-cy="cancel_delete"
              onClick={() => props.setTrigger(false)}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    ) : null;
  }
  
export default DeletePopup
