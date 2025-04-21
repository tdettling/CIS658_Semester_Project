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


import React from 'react';

const EditItemForm = ({ formData, handleChange, handleSubmit, title }) => {
  // when the user submits, convert serial numbers to a JSON string

  return (
    <div className="form-container">
        
      <h2> {title}</h2>
      <h3> Stock ID: {formData.stock_id} </h3>

      <form onSubmit={handleSubmit} className="inventory-form">
        <div className="form-group">
          <label>Product Name</label>
          <input
            type="text"
            name="product_name"
            data-cy = "product_name"
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            data-cy = "sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>PO</label>
          <input
            type="text"
            name="po"
            data-cy = "po"
            value={formData.po}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="number"
            name="price"
            data-cy = "price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Ordered</label>
          <input
            type="number"
            name="quantity_ordered"
            value={formData.quantity_ordered}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Arrived</label>
          <input
            type="number"
            name="quantity_arrived"
            value={formData.quantity_arrived}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Available</label>
          <input
            type="number"
            name="quantity_available"
            value={formData.quantity_available}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Vendor</label>
          <input
            type="text"
            name="vendor"
            value={formData.vendor}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Status</label>
          <input
            type="text"
            name="status"
            value={formData.status}
            onChange={handleChange}
          />
        </div>


        <div className="form-group">
          <label>Category</label>
          <input
            type="text"
            name="category"
            value={formData.category}
            onChange={handleChange}
          />
        </div>
        
        <button type="submit">Save</button>

      </form>
    </div>
  );
};

export default EditItemForm;
