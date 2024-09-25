import React from 'react';
import { useDispatch } from 'react-redux';
import { increaseQuantity, decreaseQuantity } from '../features/cart/cartSlice'; 

const Cart = ({ cartItems, totalPrice }) => {
  const dispatch = useDispatch();

  // Get the last 3 added products
  const lastThreeItems = cartItems.slice(-3);

  return (
    <div className="p-4 border border-gray-300 rounded-md shadow-md w-80 z-50">
      <h2 className="text-xl font-bold mb-4">Shopping Cart</h2>
      {lastThreeItems.length > 0 ? (
        <div>
          {lastThreeItems.map((item, index) => (
            <div key={index} className="flex justify-between mb-2 items-center">
              {/* Product image */}
              <img
                src={item.image} // Ensure that your product object contains an image property
                alt={item.name}
                className="w-12 h-12 object-cover mr-2"
              />
              {/* Product name and price */}
              <div className="flex flex-col justify-between flex-1">
                <span>{item.name}</span>
                <span>{(item.price * item.quantity).toFixed(2)} TK</span>
              </div>
              {/* Quantity controls */}
              <div className="flex items-center">
                <button
                  onClick={() => dispatch(decreaseQuantity({ id: item.id }))}
                  className="bg-gray-300 px-2 rounded-sm"
                >
                  -
                </button>
                <span className="px-2">{item.quantity}</span>
                <button
                  onClick={() => dispatch(increaseQuantity({ id: item.id }))}
                  className="bg-gray-300 px-2 rounded-sm"
                >
                  +
                </button>
              </div>
            </div>
          ))}
          <div className="border-t border-gray-300 my-4"></div>
          <div className="flex justify-between mb-4">
            <span className="font-bold">Total:</span>
            <span className="font-bold">{totalPrice.toFixed(2)} TK</span>
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
