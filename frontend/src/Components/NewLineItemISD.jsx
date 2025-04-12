import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function NewLineItemISD({index, inventory, updateLineItemData, initialData}) {


const [formData, setFormData] = useState({
    po: initialData.fulfilled_po || '',
    price: initialData.fulfilled_price || 0,
    quantity: initialData.fulfilled_quantity || 0,
    sku: initialData.fulfilled_sku || '',
    totalPrice: 0,
    memo: initialData.memo || '',
    date: initialData.fulfillment_date || ''
});


    const navigate = useNavigate();

    //https://www.w3schools.com/Jsref/jsref_regexp_digit_non.asp
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
      
      const skuData = inventory.filter(item => item.sku && item.sku === selectedSku);

      if (skuData.length === 0) {
        console.log("No matching SKU found in inventory.");
        return;
      } else if (skuData.length === 1) {
        const singleItem = skuData[0];
        setFormData({
          sku: selectedSku,
          po: singleItem.po,
          price: singleItem.price,
          quantity: formData.quantity,
          totalPrice: formData.quantity * singleItem.price,
          memo: formData.memo,
          date: formData.date
        });
        updateLineItemData(index, formData);
        return;
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
        <div className='lineItemElement'>
            <form id={`line-item-form-${index}`} autoComplete="off">
                <div className="autocomplete">
                    <input 
                        id="SKU" 
                        type="text" 
                        name="fulfilled_sku" 
                        value={formData.sku}
                        onChange={handleSkuChange}
                        placeholder="Stock Item" />
                    <input 
                        id="PO" 
                        type="text" 
                        name="fulfilled_po" 
                        value={formData.po} 
                        onChange={e => setFormData({ ...formData, po: e.target.value })} 
                        placeholder="PO" />
                    <input 
                        id="Price" 
                        type="number" 
                        name="fulfilled_price" 
                        value={formData.price} 
                        onChange={e => setFormData({ ...formData, price: e.target.value })} 
                        placeholder="Unit Price" />
                    <input 
                        id="Quantity" 
                        type="number" 
                        name="fulfilled_quantity" 
                        value={formData.quantity} 
                        onChange={e => setFormData({ ...formData, quantity: e.target.value })} 
                        placeholder="Quantity" />
                    <input 
                        id="TotalPrice" 
                        type="number" 
                        name="fulfilled_total_price" 
                        value={formData.totalPrice}
                        onChange={e => setFormData({ ...formData, totalPrice: e.target.value })}
                        placeholder="Total Line Price" />
                    <input 
                        id="Memo" 
                        type="text" 
                        name="fulfilled_memo" 
                        value={formData.memo}
                        onChange={e => setFormData({ ...formData, memo: e.target.value })} 
                        placeholder="Memo" />
                    <input 
                        id="Date" 
                        type="text" 
                        name="fulfilled_date" 
                        value={formData.date}
                        onChange={e => setFormData({ ...formData, date: e.target.value })} 
                        placeholder="Date" />
                </div>
            </form>
        </div>
    );
}

export default NewLineItemISD;
