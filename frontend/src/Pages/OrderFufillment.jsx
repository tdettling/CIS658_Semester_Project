import React, { useEffect, useState } from 'react';
import axios from "axios"
import { Link, useNavigate } from 'react-router-dom';  
import { FaDoorOpen } from "react-icons/fa";


const OrderFufillment = () => {
  const navigate = useNavigate();

  const newStatus = "New";
  const onOrderStatus = "On-Order";
  const readyInvoice = "Ready to Invoice";

  const [newISDs, setNewISDs] = useState([]);
  // won't do closed

  
  // fetch new ISDs
  //status = NEW
  useEffect(() => {
      axios
        .get(`http://127.0.0.1:8000/ISDs/status/${newStatus}`)
        .then((res) => {
          setNewISDs(res.data.data);
          console.log('Response Data:', res.data.data); 
        })
        .catch((err) => console.error(err));
  }, []);


  // reroute to fufillinng order
  // list items on ISD
  // Like WD, + for a component 

  const handleFufiltButtonClick = (isd_number) => {
    navigate(`/ISDs/${isd_number}`);
  };

  return (
    <div>
      <h1>New ISDs</h1>

            <table className="inventory-table">
              <thead>
                      <tr>
                        <th> Fufill  </th>
                        <th>ISD</th>
                        <th>Requestor Name</th>
                        <th>Requestor Address</th>

                      </tr>
                    </thead>
                                  <tbody>
                                    {newISDs.map((item, index) => (
                                      <tr key={index}>

                            <td> 
                            <button onClick={() => handleFufiltButtonClick(item.isd_number)}>
                            <FaDoorOpen className='editStockIcon' />
                            </button>
                            </td>
                            <td>{item.isd_number}</td>
                            <td>{item.requestor_name}</td>
                            <td>{item.requestor_address}</td>
                          </tr>
                    
                              ))}
                            </tbody>
                          </table>


    </div>
  );
}

export default OrderFufillment;