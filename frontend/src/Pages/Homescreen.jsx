import React from 'react';
import { Link } from 'react-router-dom';  

import OrdersPreview from '../Components/OrdersPreview';

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      <p>Here you can check out various inventory details.</p>

      <OrdersPreview />
    </div>
  );
}

export default HomeScreen;