import React from 'react';
import { Link } from 'react-router-dom';  

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      <p>Here you can check out various inventory details.</p>

      
      <Link to="/inventory">
        <button>View Inventory Report</button>
      </Link>
    </div>
  );
}

export default HomeScreen;