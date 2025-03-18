
/*
L Dettling
CIS 658
React Parts 1 and 2

PSA: I am slightly familer with React! It has been a while, but we do very similar things in my mobile apps class right now as well. 
*/

import './App.css';

// gotta grab my compnent
import DisplayInventory from './Components/DisplayInventory';


// putting data here for now, will be using Django I think in the project
const techData = [{
  productName: "Dell 24-inch USB-C Hub Monitor", 
  sku: 'P2425HE',
  productPrice: 196.00,
  quantity: 30, 
  poNumber: 'PO-1000456',
  description: "This monitor has a USB-Hub base, so you will never need a dell docking station again! This product is 24 inches",
}, 
{
  productName: "Dell 27-inch USB-C Hub Monitor", 
  sku: 'P2725HE',
  productPrice: 210.00,
  quantity: 27, 
  poNumber: 'PO-1000456',
  description: "This monitor has a USB-Hub base, so you will never need a dell docking station again! This product is 27 inches ",
  }, 

{
  productName: "Dell Latitude 5550", 
  sku: '5550',
  productPrice: 1210.00,
  quantity: 157, 
  poNumber: 'PO-1024889',
  description: "i7 155U core processor with intel graphics, 15 inches. ",
  }, 

{
  productName: "Dell Latitude 7450", 
  sku: '7450',
  productPrice: 1275.00,
  quantity: 143, 
  poNumber: 'PO-1024889',
  description: "i7 155U core processor with intel graphics, 14 inches. ",
  }, 

]


function App() {
  return (
    <div className="App">
        <h1> Wow, this is a fantastic inventory report with minor styling! </h1>
        <DisplayInventory data = {techData}/>
    </div>
  );
}

export default App;
