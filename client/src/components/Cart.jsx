// Cart.js
import React from 'react';

const Cart = ({ cartItems }) => {
  // Calculate the total price
  const totalPrice = cartItems.reduce((total, item) => total + item.price, 0);

  // Get the last 3 added products
  const lastThreeItems = cartItems.slice(-3);

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md w-80 z-50">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {lastThreeItems.length > 0 ? (
        <div>
          {lastThreeItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2">
              <span>{item.name}</span>
              <span>${item.price.toFixed(2)}</span>
            </div>
          ))}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between">
            <button className="bg-primary text-white px-4 py-2 rounded-sm text-sm">Check Out</button>
            <button className="bg-gray-500 text-white px-4 py-2 rounded-sm text-sm">Continue Shopping</button>
          </div>
        </div>
      ) : (
        <p className="text-gray-500">Your cart is empty.</p>
      )}
    </div>
  );
};

export default Cart;
