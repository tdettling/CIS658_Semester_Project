import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';  
import { FaPlusSquare } from "react-icons/fa";

// Autocomplete
//  https://www.w3schools.com/howto/howto_js_autocomplete.asp
function NewLineItemISD() {
     const [inventory, setInventory] = useState([]);
     const [productNames, setProductNames] = useState([]);

     const [fetchInventory, setFetchInventory] = useState(true);
  
     const navigate = useNavigate();
   
    // grab stock for autofill
     useEffect(() => {
       if (fetchInventory) {
         axios
           .get('http://127.0.0.1:8000/get_inventory')
           .then((res) => {
             setInventory(res.data.data);
             setProductNames(res.data.data.product_name)
           })
           .catch((err) => console.error(err));
           
         setFetchInventory(false);
       }
     }, [fetchInventory]);
   

    // Search by SKU
    //Search by Vendor

    //SQL put together here

    //fetch request to backend to grab stock item

    // post request to backend to add item to order

    //fetch lowest PO of a SKU. 



    return (
        <div>
            <form id={`line-item-form-${index}`} autoComplete="off">
                <div className="autocomplete">
                    <input id="SKU" type="text" name="fulfilled_sku" placeholder="Stock Item" />
                    <input id="PO" type="text" name="fulfilled_po" placeholder="PO" />
                    <input id="Quantity" type="number" name="fulfilled_quantity" placeholder="Quantity" />
                    <input id="Price" type="number" name="fulfilled_price" placeholder="Unit Price" />
                    <input id="TotalPrice" type="number" name="fulfilled_total_price" placeholder="Total Line Price" />
                    <input id="Memo" type="text" name="fulfilled_memo" placeholder="Memo" />
                    <input id="Date" type="text" name="fulfilled_date" placeholder="Date" />
                </div>
            </form>
        </div>
    );
}

export default NewLineItemISD
