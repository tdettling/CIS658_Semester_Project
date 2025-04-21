/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.youtube.com/watch?v=i8fAO_zyFAM

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
