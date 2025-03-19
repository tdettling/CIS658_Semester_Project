import React, { use, useState } from 'react'

function ISDPreview() {

    // api call to get data should go here. 
    // get preview data

    //const [previewData, updatePreviewData] = useState();
    let newData = [
        {
            'ISD': 'ISD-10002355', 
            'Requestor': 'L Dettling', 
        }, 
        {
            'ISD': 'ISD-10008534', 
            'Requestor': 'Clair Harmsen', 
        }
    ];

    let onOrderData = [
        {
            'ISD': 'ISD-10008554', 
            'Requestor': 'Celeste Lareau', 
        }, 
        {
            'ISD': 'ISD-10006331', 
            'Requestor': 'Megan Koeman-Eding', 
        }
    ]
    
    let invoicingData = [
        {
            'ISD': 'ISD-10003625', 
            'Requestor': 'Celeste Lareau', 
        }, 
        {
            'ISD': 'ISD-10001574', 
            'Requestor': 'L Dettling', 
        }
    ]

    const [previewNewData, updatePreviewData] = useState(newData);
    const [previewOnOrderData, updateOnOrderData] = useState(onOrderData);
    const [previewInvoicingData, updateInvoicingData] = useState(invoicingData);

    return (
        <div className="ordersPreview">

          <div className="ordersPreviewBox">
            <h3>New ISD's</h3>
            <div>
              {previewNewData.map((item, index) => (
                <div key={index} className="orderItem">
                  <h4>{item.ISD}</h4>
                  <h5>{item.Requestor}</h5>
                </div>
              ))}
            </div>
          </div>
      

          <div className="ordersPreviewBox">
            <h3>On-Order ISD's</h3>
            <div>
              {previewOnOrderData.map((item, index) => (
                <div key={index} className="orderItem">
                  <h4>{item.ISD}</h4>
                  <h5>{item.Requestor}</h5>
                </div>
              ))}
            </div>
          </div>
      
 
          <div className="ordersPreviewBox">
            <h3>Ready for Invoicing</h3>
            <div>
              {previewInvoicingData.map((item, index) => (
                <div key={index} className="orderItem">
                  <h4>{item.ISD}</h4>
                  <h5>{item.Requestor}</h5>
                </div>
              ))}
            </div>
          </div>
        </div>
      );
    }

export default ISDPreview;
