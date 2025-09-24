import React from "react";
import { FiTrash2 } from "react-icons/fi";

function Cart({ item, onAdd, onSubtract, onRemove }) {
  const { productId, quantity } = item;
  const { image, name, price, _id } = productId; // _id is productId

  return (
    <div className="grid grid-cols-12 items-start gap-4 border-b border-gray-300 py-4">
      {/* Left Section */}
      <div className="col-span-8 flex gap-4">
        {/* Image */}
        <img
          src={image}
          alt={name}
          className="w-32 h-48 object-cover rounded-md transform hover:scale-105 transition"
        />

        {/* Product Details */}
        <div className="flex flex-col justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{name}</h3>

          {/* Quantity Controls */}
          <div className="flex items-center gap-3 mt-2">
            <button
              onClick={() => onSubtract(_id)}   
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              -
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={() => onAdd(_id)}       
              className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300"
            >
              +
            </button>
          </div>

          {/* Remove Button */}
          <button
            onClick={() => onRemove(_id)}        
            className="flex items-center gap-2 text-red-500 mt-3 hover:text-red-700"
          >
            <FiTrash2 /> Remove
          </button>
        </div>
      </div>

      {/* Right Section (Price) */}
      <div className="col-span-4 flex justify-end">
        <p className="text-lg font-semibold">
          ₦{(price * quantity).toLocaleString()}
        </p>
      </div>
    </div>
  );
}

export default Cart;
