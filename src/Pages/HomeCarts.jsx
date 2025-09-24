import React from 'react';
import Cart from '../Components/Cart';
import { useNavigate } from "react-router-dom";

function HomeCarts({ isHome, cart = [], onAdd, onSubtract, onRemove }) {
   
  // ✅ Make sure cart is always an array
  const displayedCart = Array.isArray(cart) ? (isHome ? cart.slice(0, 3) : cart) : [];
  const navigate = useNavigate();
  console.log("Cart items:", displayedCart);

  // ✅ Protect reduce by defaulting to []
  const subtotal = displayedCart.reduce(
    (acc, item) => acc + (item.productId?.price || 0) * (item.quantity || 0),
    0
  );

  return (
    <section className="bg-[#fff5e9] min-h-screen px-4 md:px-16 pt-28 pb-20">
      <div className="text-xl font-semibold mb-4 border-b pb-3 grid grid-cols-12">
        <div className="col-span-8">Product</div>
        <div className="col-span-4 text-right">Total</div>
      </div>

      {displayedCart.length === 0 ? (
        <p className="text-center text-gray-500">Your cart is empty 😢</p>
      ) : (
        displayedCart.map((item, index) => (
          <Cart
            key={`${item.productId?._id || index}`} 
            image={item.image}
            item={item}
            price={item.productId?.price}
            quantity={item.quantity}
            onAdd={() => onAdd(item.productId._id)}
            onSubtract={() => onSubtract(item.productId._id)}
            onRemove={() => onRemove(item._id)}
          />
        ))
      )}

      <div className="flex justify-between text-lg font-semibold">
        <span>Subtotal</span>
        <span>₦{subtotal.toLocaleString()}</span>
      </div>

      <div className="mt-4 text-center">
        <button
          onClick={() =>
            navigate('/Checkout', {
              state: { cart: displayedCart, subtotal }
            })
          }
          className="w-full bg-[#fb6605] text-white px-12 py-3 rounded hover:bg-orange-600 transition font-semibold"
        >
          Checkout
        </button>
        <p className="text-sm text-gray-600 mt-1">
          Taxes and shipping are calculated at checkout
        </p>
      </div>
    </section>
  );
}

export default HomeCarts;
