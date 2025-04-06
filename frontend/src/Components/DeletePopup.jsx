import React from 'react'

import { MdDelete } from "react-icons/md";

// https://www.youtube.com/watch?v=i8fAO_zyFAM

function DeletePopup(props) {
    return props.trigger ? (
      <div className="deletePopup">
        <div className="deletePopup-inner">
          {props.children}
          
          <div className="popup-buttons">
            <button
              className="confirm-btn"
              onClick={props.onConfirm}
            >
              Yes, I'm sure
            </button>
            
            <button
              className="cancel-btn"
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
