/*
L Dettling 
CIS 658 Project

Sources for this file:
https://www.w3schools.com/Jsref/jsref_regexp_digit_non.asp
*/

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import { useEffect } from 'react';

function NewLineItemISD({index, inventory, updateLineItemData, initialData, onPriceChange }) {
    
  
  const getTodayDate = () => {
      return new Date().toISOString().split('T')[0];
    };

  const [formData, setFormData] = useState({
    po: initialData.fulfilled_po || '',
    price: initialData.fulfilled_price || 0,
    quantity: initialData.fulfilled_quantity || 0,
    sku: initialData.fulfilled_sku || '',
    totalPrice: 0,
    memo: initialData.memo || '',
    date: initialData.fulfillment_date || getTodayDate(), 
  });
  
  


  const [populatedSerialNums, setSerialNums] = useState([]);
  const navigate = useNavigate();

    


  useEffect(() => {
    const quantity = parseFloat(formData.quantity);
    const price = parseFloat(formData.price);
  
    if (!isNaN(quantity) && !isNaN(price) && quantity > 0) {
      const total = quantity * price;
  
      const formattedTotal = new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD',
      }).format(total);
  
      // update local state with formatted total
      setFormData(prev => ({
        ...prev,
        totalPrice: formattedTotal,
      }));
  
      //total calculation
      updateLineItemData(index, {
        ...formData,
        fulfilled_price: price,
        fulfilled_quantity: quantity,
      });
  
    } else {
      setFormData(prev => ({
        ...prev,
        totalPrice: '$0.00',
      }));
  
      updateLineItemData(index, {
        ...formData,
        fulfilled_price: 0,
        fulfilled_quantity: 0,
      });
    }
  }, [formData.quantity, formData.price]);
  
  


    
    function isFullyNumeric(po) {
      return /^\d+$/.test(po);
    }

    function lowestPO(skuData) {
      if (!skuData || skuData.length === 0) return null;

      let lowest = skuData[0];

      for (let i = 1; i < skuData.length; i++) {
        const current = skuData[i];

        const currentIsNumeric = isFullyNumeric(current.po);
        const lowestIsNumeric = isFullyNumeric(lowest.po);

        if (currentIsNumeric && lowestIsNumeric) {
          if (Number(current.po) < Number(lowest.po)) {
            lowest = current;
          }
        }
      }

      return lowest;
    }

    const handleSkuChange = (e) => {


      const selectedSku = e.target.value;

      setFormData({
        ...formData,
        sku: selectedSku,
      });
      
      const skuData = inventory.filter(item => item.sku && item.sku === selectedSku);
      if (skuData.length === 0) {
        console.log("No matching SKU found in inventory.");
        return;
      } else if (skuData.length === 1) {
    
        const newFormData = {
          sku: selectedSku,
          po: skuData[0].po,
          price: skuData[0].price,
          quantity: formData.quantity,
          totalPrice: formData.quantity * skuData[0].price,
          memo: formData.memo,
          date: formData.date
        };
    
        setFormData(newFormData);
        updateLineItemData(index, newFormData);
      } else {
        const lowestPoItem = lowestPO(skuData);
        
        if (lowestPoItem) {
          
          const newFormData = {
            sku: selectedSku,
            po: lowestPoItem.po,
            price: lowestPoItem.price,
            quantity: formData.quantity,
            totalPrice: formData.quantity * lowestPoItem.price,
            memo: formData.memo,
            date: formData.date
          };
    
          setFormData(newFormData);
          updateLineItemData(index, newFormData);
        } else {
          setFormData({
            sku: selectedSku,
            po: '',
            price: '',
            quantity: '',
            totalPrice: '',
            memo: '',
            date: ''
          });
        }
      }
    };



    



    return (
      <div className="lineItemElement">
        <form id={`line-item-form-${index}`} autoComplete="off">
          <div className="lineItem-row">
            <div className="lineItem-field">
              <label htmlFor="SKU">SKU</label>
              <input
                id="SKU"
                type="text"
                name="fulfilled_sku"
                value={formData.sku}
                onChange={handleSkuChange}
                placeholder="Stock Item"
                required
              />
            </div>
    
            <div className="lineItem-field">
              <label htmlFor="PO">PO</label>
              <input
                id="PO"
                type="text"
                name="fulfilled_po"
                value={formData.po}
                onChange={e => setFormData({ ...formData, po: e.target.value })}
                placeholder="PO"
                required
              />
            </div>
    
            <div className="lineItem-field">
              <label htmlFor="Price">Unit Price</label>
              <input
                id="Price"
                type="number"
                name="fulfilled_price"
                value={formData.price}
                onChange={e => setFormData({ ...formData, price: e.target.value })}
                placeholder="Unit Price"
                required
              />
            </div>
          </div>
    
          <div className="lineItem-row">
            <div className="lineItem-field">
              <label htmlFor="Quantity">Quantity</label>
              <input
                id="Quantity"
                type="number"
                name="fulfilled_quantity"
                value={formData.quantity}
                onChange={e => setFormData({ ...formData, quantity: e.target.value })}
                placeholder="Quantity"
                required
              />
            </div>
    
            <div className="lineItem-field">
              <label htmlFor="TotalPrice">Total Price</label>
              <input
                id="TotalPrice"
                type="text"
                name="fulfilled_total_price"
                value={formData.totalPrice}
                readOnly
                placeholder="$0.00"
              />
            </div>


    
            <div className="lineItem-field">
              <label htmlFor="Memo">Memo</label>
              <input
                id="Memo"
                type="text"
                name="fulfilled_memo"
                value={formData.memo}
                onChange={e => setFormData({ ...formData, memo: e.target.value })}
                placeholder="Memo"
                required
              />
            </div>
          </div>
    
          <div className="lineItem-row">
            <div className="lineItem-field">
              <label htmlFor="Date">Fulfillment Date</label>
              <input
                id="Date"
                type="date"
                name="fulfilled_date"
                value={formData.date}
                onChange={e => setFormData({ ...formData, date: e.target.value })}
                required
              />

            </div>
          </div>
        </form>
      </div>
    );
    
  }
  
  export default NewLineItemISD;
