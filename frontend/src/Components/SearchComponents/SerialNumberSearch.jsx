/*
L Dettling 
CIS 658 Project

Sources for this file:

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


