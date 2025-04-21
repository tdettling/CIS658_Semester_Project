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



function SerialNumberSearch() {
  return (
    <div>
        <form autocomplete="on" action="/">
            <div class="autocomplete" >
                <input id="sn_Search" type="text" name="SN_search" placeholder="Serial #"/>
            </div>

        <input type="submit"/>

        </form>
    </div>
  )
}

export default SerialNumberSearch


