/*
L Dettling 
CIS 658 Project

Sources for this file:
*/

import React from 'react'

function SearchHomepage() {
    //handle ISD search
        // route to orderfuffillment

    //handle Serial number search
        // pull up stock item

    // handle PO search
        // pull up stock item

    //handle requestor search
        // pull up isd, route to order fufillment 


  return (
    <div>

      <div>

        <div>
            <form autocomplete="on" action="/">
                <div class="autocomplete" >
                    <input id="ISD_Search" type="text" name="isd_search" placeholder="ISD"/>
                </div>

                <input type="submit"/>

            </form>
        </div>

      </div>

      <div>
      <form autocomplete="on" action="/">
                <div class="autocomplete" >
                    <input id="PO_Search" type="text" name="po_search" placeholder="PO # "/>
                </div>

                <input type="submit"/>

            </form>

      </div>

      <div>
      <form autocomplete="on" action="/">
                <div class="autocomplete" >
                    <input id="Serial_Search" type="text" name="serial_search" placeholder="Serial Number"/>
                </div>

                <input type="submit"/>

            </form>

      </div>

      <div>
      <form autocomplete="on" action="/">
                <div class="autocomplete" >
                    <input id="Requestor_Search" type="text" name="requestor_search" placeholder="Requestor"/>
                </div>

                <input type="submit"/>

            </form>

      </div>

    </div>
  )
}

export default SearchHomepage;
