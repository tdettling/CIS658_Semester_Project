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
import { Link, useNavigate } from 'react-router-dom';  
import { FaDoorOpen } from "react-icons/fa";
import { MdDelete } from "react-icons/md";
import { FaPlusSquare } from "react-icons/fa";
import { useLocation, useSearchParams } from 'react-router-dom';

import api from '../api';

import ISDSearch from '../Components/SearchComponents/ISDSearch';
import RequesterSearch from '../Components/SearchComponents/RequesterSearch';
import DeletePopup from '../Components/DeletePopup';

const OrderFufillment = () => {
  const navigate = useNavigate();

  const [fetchNewISDs, setFetchNewISDs] = useState(true);
  const [fetchOrderISDs, setFetchOrderISDs] = useState(true);
  const [fetchInvoiceISDs, setFetchInvoiceISDs] = useState(true);
  const [fetchClosedISDs, setFetchClosedISDs] = useState(true);

  const newStatus = "New";
  const onOrderStatus = "On-Order";
  const readyInvoice = "Ready-to-Invoice";
  const closedStatus = "Closed";

  const [newISDs, setNewISDs] = useState([]);
  const [onOrderISDs, setOnOrderISDs] = useState([]);
  const [readyInvoiceISDs, setReadyInvoiceISDs] = useState([]);
  const [closedISDs, setClosedISDs] = useState([]);

  //deleting an item, double check via popup
  const [deletePopup, setPopup] = useState(false);
  const [deletePopupItem, setDeletePopupItem] = useState(null);

  const location = useLocation();
  const [searchParams] = useSearchParams();

  // Combine route state and query param
  const requestorNameFromState = location.state?.requestorName?.toLowerCase();
  const requestorNameFromQuery = searchParams.get('requestor')?.toLowerCase();
  const requestorNameFilter = requestorNameFromState || requestorNameFromQuery || '';

  // won't do closed

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
  }, [fetchNewISDs, newStatus]);

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
  }, [fetchOrderISDs, onOrderStatus]);

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
  }, [fetchInvoiceISDs, readyInvoice]);

  //closed
  useEffect(() => {
    if (fetchClosedISDs) {
      api.get(`/ISDs/status/${closedStatus}`)
        .then((res) => {
          setClosedISDs(res.data.data);
          console.log('Invoicing Response Data:', res.data.data); 
          setFetchClosedISDs(false);
        })
        .catch((err) => console.error(err));
    }
  }, [fetchClosedISDs, closedStatus]);

  // reroute to fufillinng order
  // list items on ISD
  // Like WD, + for a component 
  const handleFufiltButtonClick = (isd_number) => {
    navigate(`/ISDs/${isd_number}`);
  };

  const refreshAllISDLists = () => {
    setFetchNewISDs(true);
    setFetchOrderISDs(true);
    setFetchInvoiceISDs(true);
    setFetchClosedISDs(true);
  };

  const handleDeleteButtonClick = async (e, isd_number) => {
    e.preventDefault();
    try {
      const res = await api.delete(`/ISDs/delete/${isd_number}`);
      console.log('Delete successful:', res.data);
      // triggers refresh,
      refreshAllISDLists();
    } catch (err) {
      console.error('Error deleting item:', err);
    }
  };

  const handleNewButtonClick = () => {
    navigate("/ISDs/new");
  };

  return (
    <div>

      <div className="search-bar-group">
        <ISDSearch />
        <RequesterSearch />
      </div>


      <button onClick={handleNewButtonClick} className="newISD-Stock_button" name="newstock_button">
        <FaPlusSquare className='addStockIcon' />
      </button>

      <h2 className="section-header">New ISDs</h2>

      <table className="new-ISD--table">
        <thead>
          <tr>
            <th> Fufill  </th>
            <th>ISD</th>
            <th>Requestor Name</th>
            <th>Requestor Address</th>
          </tr>
        </thead>
        <tbody>
          {newISDs
            .filter(item =>
              requestorNameFilter === '' || item.requestor_name?.toLowerCase().includes(requestorNameFilter)
            )
            .map((item, index) => (
              <tr key={index}>
              <td>
  <div className="action-buttons">
    <button
      className="icon-button"
      data-cy={`fulfill-ISD-${item.ticket_number}`}
      onClick={() => handleFufiltButtonClick(item.isd_number)}
      title="Fulfill ISD"
    >
      <FaDoorOpen />
    </button>

    <button
      className="icon-button"
      data-cy={`delete-ISD-${item.ticket_number}`}
      onClick={() => {
        setPopup(true);
        setDeletePopupItem(item);
      }}
      title="Delete ISD"
    >
      <MdDelete />
    </button>
  </div>
</td>

                <td>{item.isd_number}</td>
                <td>{item.requestor_name}</td>
                <td>{item.requestor_address}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="section-header"> On-Order ISDs </h2>
      <table className="order-ISD-table">
        <thead>
          <tr>
            <th> Fufill  </th>
            <th>ISD</th>
            <th>Requestor Name</th>
            <th>Requestor Address</th>
          </tr>
        </thead>
        <tbody>
          {onOrderISDs
            .filter(item =>
              requestorNameFilter === '' || item.requestor_name?.toLowerCase().includes(requestorNameFilter)
            )
            .map((item, index) => (
              <tr key={index}>
              <td>
  <div className="action-buttons">
    <button
      className="icon-button"
      data-cy={`fulfill-ISD-${item.ticket_number}`}
      onClick={() => handleFufiltButtonClick(item.isd_number)}
      title="Fulfill ISD"
    >
      <FaDoorOpen />
    </button>

    <button
      className="icon-button"
      data-cy={`delete-ISD-${item.ticket_number}`}
      onClick={() => {
        setPopup(true);
        setDeletePopupItem(item);
      }}
      title="Delete ISD"
    >
      <MdDelete />
    </button>
  </div>
</td>

                <td>{item.isd_number}</td>
                <td>{item.requestor_name}</td>
                <td>{item.requestor_address}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="section-header"> Ready to Invoice ISDs </h2>
      <table className="closed-ISD-table">
        <thead>
          <tr>
            <th> Fufill  </th>
            <th>ISD</th>
            <th>Requestor Name</th>
            <th>Requestor Address</th>
          </tr>
        </thead>
        <tbody>
          {readyInvoiceISDs
            .filter(item =>
              requestorNameFilter === '' || item.requestor_name?.toLowerCase().includes(requestorNameFilter)
            )
            .map((item, index) => (
              <tr key={index}>
              <td>
  <div className="action-buttons">
    <button
      className="icon-button"
      data-cy={`fulfill-ISD-${item.ticket_number}`}
      onClick={() => handleFufiltButtonClick(item.isd_number)}
      title="Fulfill ISD"
    >
      <FaDoorOpen />
    </button>

    <button
      className="icon-button"
      data-cy={`delete-ISD-${item.ticket_number}`}
      onClick={() => {
        setPopup(true);
        setDeletePopupItem(item);
      }}
      title="Delete ISD"
    >
      <MdDelete />
    </button>
  </div>
</td>

                <td>{item.isd_number}</td>
                <td>{item.requestor_name}</td>
                <td>{item.requestor_address}</td>
              </tr>
            ))}
        </tbody>
      </table>

      <h2 className="section-header"> Closed ISDs </h2>
      <table className="closed-ISD-table">
        <thead>
          <tr>
            <th> Fufill  </th>
            <th>ISD</th>
            <th>Requestor Name</th>
            <th>Requestor Address</th>
          </tr>
        </thead>
        <tbody>
          {closedISDs
            .filter(item =>
              requestorNameFilter === '' || item.requestor_name?.toLowerCase().includes(requestorNameFilter)
            )
            .map((item, index) => (
              <tr key={index}>
              <td>
  <div className="action-buttons">
    <button
      className="icon-button"
      data-cy={`fulfill-ISD-${item.ticket_number}`}
      onClick={() => handleFufiltButtonClick(item.isd_number)}
      title="Fulfill ISD"
    >
      <FaDoorOpen />
    </button>

    <button
      className="icon-button"
      data-cy={`delete-ISD-${item.ticket_number}`}
      onClick={() => {
        setPopup(true);
        setDeletePopupItem(item);
      }}
      title="Delete ISD"
    >
      <MdDelete />
    </button>
  </div>
</td>

                <td>{item.isd_number}</td>
                <td>{item.requestor_name}</td>
                <td>{item.requestor_address}</td>
              </tr>
            ))}
        </tbody>
      </table>


      {deletePopupItem && (
        <DeletePopup
          trigger={deletePopup}
          setTrigger={(val) => {
            setPopup(val);
            if (!val) setDeletePopupItem(null);
          }}
          onConfirm={(e) => {
            handleDeleteButtonClick(e, deletePopupItem?.isd_number);
            setPopup(false);
            setDeletePopupItem(null);
          }}
        >
          <h2>Are you sure you want to delete this ISD?</h2>
          <p>ISD Number: {deletePopupItem.isd_number}</p>
          <p>Requestor: {deletePopupItem.requestor_name}</p>
        </DeletePopup>
      )}
    </div>
  );
};

export default OrderFufillment;
