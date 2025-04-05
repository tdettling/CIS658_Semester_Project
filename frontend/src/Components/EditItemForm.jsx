import React from 'react';

const EditItemForm = ({ formData, handleChange, handleSubmit, title }) => {
  
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
            value={formData.product_name}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>SKU</label>
          <input
            type="text"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>PO</label>
          <input
            type="text"
            name="po"
            value={formData.po}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Price</label>
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Ordered</label>
          <input
            type="text"
            name="quantity_ordered"
            value={formData.quantity_ordered}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Arrived</label>
          <input
            type="text"
            name="quantity_arrived"
            value={formData.quantity_arrived}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Quantity Available</label>
          <input
            type="text"
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
          <label>Serial Numbers</label>
          <input
            type="text"
            name="serial_numbers"
            value={formData.serial_numbers}
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
