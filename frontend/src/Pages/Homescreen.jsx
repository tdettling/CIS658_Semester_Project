import React from 'react';
import { Link } from 'react-router-dom';  

import OrdersPreview from '../Components/OrdersPreview';
import SearchHomepage from '../Components/SearchHomepage';

const HomeScreen = () => {
  return (
    <div>
      <h1>Welcome to Our Store!</h1>
      <p>Here you can check out various inventory details.</p>

      <OrdersPreview />

      <SearchHomepage />

    </div>
  );
}

export default HomeScreen;