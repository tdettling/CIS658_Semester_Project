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
import axios from "axios"
import { isAuthenticated } from '../auth';
import { Link, useNavigate } from 'react-router-dom';  
import { FaDoorOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";

import api from '../api';

function ISDPreview() {
  const navigate = useNavigate();

   const [newISDs, setNewISDs] = useState([]);
    const [onOrderISDs, setOnOrderISDs] = useState([]);
    const [readyInvoiceISDs, setReadyInvoiceISDs] = useState([]);
    const [closedISDs, setClosedISDs] = useState([]);


    const [fetchNewISDs, setFetchNewISDs] = useState(true);
    const [fetchOrderISDs, setFetchOrderISDs] = useState(true);
    const [fetchInvoiceISDs, setFetchInvoiceISDs] = useState(true);
    const [fetchClosedISDs, setFetchClosedISDs] = useState(true);

    const newStatus = "New";
    const onOrderStatus = "On-Order";
    const readyInvoice = "Ready-to-Invoice";
    const closed = "Closed";



     // fetch new ISDs
  // NEW
  useEffect(() => {
    if (fetchNewISDs) {
      api.get(`/ISDs/status/${newStatus}`)  
        .then((res) => {
          setNewISDs(res.data.data);
          console.log('New ISD Response Data:', res.data.data);
          setFetchNewISDs(false);
        })
        .catch((err) => console.error(err));
    }
  }, [fetchNewISDs]);

  // ON ORDER
  useEffect(() => {
    if (fetchOrderISDs) {
      api.get(`/ISDs/status/${onOrderStatus}`) 
        .then((res) => {
          setOnOrderISDs(res.data.data);
          console.log('On Order Response Data:', res.data.data);
          setFetchOrderISDs(false);
        })
        .catch((err) => console.error(err));
    }
  }, [fetchOrderISDs]);

  // INVOICE
  useEffect(() => {
    if (fetchInvoiceISDs) {
      api.get(`/ISDs/status/${readyInvoice}`) 
        .then((res) => {
          setReadyInvoiceISDs(res.data.data);
          console.log('Invoicing Response Data:', res.data.data);
          setFetchInvoiceISDs(false);
        })
        .catch((err) => console.error(err));
    }
  }, [fetchInvoiceISDs]);


    // Closed
    useEffect(() => {
      if (fetchInvoiceISDs) {
        api.get(`/ISDs/status/${closed}`) 
          .then((res) => {
            setClosedISDs(res.data.data);
            console.log('Invoicing Response Data:', res.data.data);
            setFetchClosedISDs(false);
          })
          .catch((err) => console.error(err));
      }
    }, [fetchClosedISDs]);

  
  const refreshAllISDLists = () => {
    setFetchNewISDs(true);
    setFetchOrderISDs(true);
    setFetchInvoiceISDs(true);
    setFetchClosedISDs(true);
  };


  const handleISDClick = (isdNumber) => {
    console.log('Clicked ISD:', isdNumber);
    navigate(`/ISDs/${isdNumber}`) 
  };
  

    return (
        <div className="ordersPreview">

          <div className="ordersPreviewBox">
            <h3>New ISD's</h3>
            <div>
            
            {newISDs.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="orderItem"
                  onClick={() => handleISDClick(item.isd_number)}
                  style={{ cursor: 'pointer' }} 
                >
                  <h4>ISD-{item.isd_number}</h4>
                  <h5>{item.requestor_name}</h5>
                </div>
              ))}
            </div>
          </div>
      

                <div className="ordersPreviewBox">
        <h3>On-Order ISD's</h3>
          <div>
            {onOrderISDs.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="orderItem"
                  onClick={() => handleISDClick(item.isd_number)}
                  style={{ cursor: 'pointer' }} 
                >
                <h4>ISD-{item.isd_number}</h4>
                <h5>{item.requestor_name}</h5>
              </div>
            ))}
          </div>
          </div>

      
 
          <div className="ordersPreviewBox">
            <h3>Ready for Invoicing</h3>
            <div>
              {readyInvoiceISDs.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="orderItem"
                  onClick={() => handleISDClick(item.isd_number)}
                  style={{ cursor: 'pointer' }} 
                >
                <h4>ISD-{item.isd_number}</h4>
                <h5>{item.requestor_name}</h5>
                </div>
              ))}
            </div>
          </div>


          <div className="ordersPreviewBox">
            <h3>Closed</h3>
            <div>
              {closedISDs.slice(0, 3).map((item, index) => (
                <div
                  key={index}
                  className="orderItem"
                  onClick={() => handleISDClick(item.isd_number)}
                  style={{ cursor: 'pointer' }} 
                >
                <h4>ISD-{item.isd_number}</h4>
                <h5>{item.requestor_name}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default ISDPreview;
