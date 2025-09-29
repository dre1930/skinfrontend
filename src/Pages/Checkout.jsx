import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaTruck, FaStore } from "react-icons/fa";
import { toast } from "react-toastify";

function Checkout() {
  const [cart, setCart] = useState([]);
  const [subtotal, setSubtotal] = useState(0);

  // form fields
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");
  const [phone, setPhone] = useState("");
  const [delivery, setDelivery] = useState("ship");
  const [payment, setPayment] = useState("flutterwave");
  const [shipping, setShipping] = useState("");
  const [vat, setVat] = useState(0);
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("");
  const total = subtotal + shipping + vat;



  // recalc VAT whenever subtotal changes
useEffect(() => {
  setVat(subtotal * 0.0075);  
}, [subtotal]);




useEffect(() => {
  setShipping(delivery === "ship" ? 10 : 0);
}, [delivery]);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const { data } = await axios.get("/api/cart/get", {
          headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
        });
        
        setCart(data.items);
        setSubtotal(data.items.reduce((sum, i) => sum + i.productId.price * i.quantity, 0));
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Failed to load cart. Please try again.");

      }
    };
    fetchCart();
  }, []);

  const handleCheckout = async () => {
    
    
    try {
      const token = localStorage.getItem("token");
    const orderData = {
  fullName,
  email,
  address,
  city,
  state,
  postalCode,
  country: "Nigeria",
  phone,
  delivery: delivery,          // "ship" or "store"
  payment: payment,            // "paystack" or "bank"
  shippingFee: shipping,
};

      console.log("Order data:", orderData);
      const res = await axios.post("/api/orders/checkout", orderData, {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` }
      });
      const order = res.data.order;



      const paystackRes = await axios.post(
      "/api/payments/initialize",
      {
        email,
        total: order.total, // in Naira
        orderId: order._id,
        status: "pending"
      },

      {
        headers: { Authorization: `Bearer ${token}` }
      }
    );
      window.location.href = paystackRes.data.authorization_url;

      console.log("Order success:", res.data);
    } catch (err) {
      console.error("Order failed:", err);
      toast.error("Checkout failed. Please try again.");
    }
  };

  return (
    <div className="bg-[#fff5e9] min-h-screen px-4 md:px-12 lg:px-20 py-10">
      <div className="max-w-6xl mx-auto mt-20">
        {/* HEADER ROW */}
        <div className="text-xl font-semibold mb-4 border-b  grid grid-cols-12">
          <div className="col-span-8">Detail</div>
          <div className="col-span-4 text-right">Order summary</div>
        </div>

        {/* TWO COLUMNS */}
        <div className="grid grid-cols-2 lg:grid-cols-12 gap-10">
          {/* LEFT SIDE - FORM */}
          <div className="lg:col-span-8">
            {/* Delivery */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Delivery</h3>
              <div className="space-y-3 border border-gray-400">
                <label className= {`flex items-center gap-2 p-3 cursor-pointer 
                  ${delivery === "ship" ? "bg-[#ffddc7]" : ""}`}>
                  <input
                    type="radio"
                    name="delivery"
                    value="ship"
                    checked={delivery === "ship"}
                    onChange={() => setDelivery("ship")}
                    className="accent-orange-500"
                  />
                  <span className="flex items-center">
                     Ship
                  </span>
                  <span className=" text-[10px] text-gray-500 lg:w-full sm:w-full">
                    (Delivered within5-10 working days)
                  </span>
                   <FaTruck className="text-orange-500" />
                </label>
                
                <label 
                    className={`flex items-center gap-2 p-3 cursor-pointer 
                    ${delivery === "store" ? "bg-[#ffddc7]" : ""}`}
                  >
                  <input
                    type="radio"
                    name="delivery"
                    value="store"
                    checked={delivery === "store"}
                    onChange={() => setDelivery("store")}
                    className="accent-orange-500 border border-orange-400"
                  />
                  <span className="flex items-center sm:w-full lg:w-full">
                    Pickup in store
                  </span>
                    <FaStore className="text-orange-500" /> 
                </label>
              </div>
            </div>

            {/* Shipping address */}
            <div className="mb-6">
              <h3 className="font-medium mb-3">Shipping address</h3>
              <div className="space-y-4">
                <label htmlFor="">Full name</label>
                <input
                id="fullName"
                  type="text"
                  value={fullName}
                  onChange={(e) => setFullName(e.target.value)}
                  placeholder="Full name"
                  className="w-full border border-gray-400 px-3 py-2 "
                />
                <label htmlFor="">Email</label>
                <input
                id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  type="email"
                  placeholder="Email"
                  className="w-full border border-gray-400 px-3 py-2"
                />

                <label htmlFor="">Country/Region</label>
                <select className="w-full border px-3 py-2 border-orange-500 text-orange-500">
                  <option>Nigeria</option>
                  <option>Ghana</option>
                  <option>Kenya</option>
                </select>

                <label htmlFor="">Adress</label>
                <input
                id="address"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  type="text"
                  placeholder="Address"
                  className="w-full border border-gray-400 px-3 py-2 "
                />

                <div className="grid grid-cols-1 md:grid-cols-3 gap-3 lg:md:grid-cols-3">
                  <div className='flex flex-col'>
                      <label htmlFor="" className='mb-1'>City </label>
                        <input
                          id='city'
                          value={city}
                          onChange={(e) => setCity(e.target.value)}
                          type="text"
                          placeholder="City"
                          className="border px-3 py-2 border-gray-400"
                        />
                  </div>
                  
                  <div className='flex flex-col'>
                    <label htmlFor="" className='mb-1'>State </label>
                      <input
                        id='state'
                        type="text"
                        value={state}
                        onChange={(e) => setState(e.target.value)}
                        placeholder="State"
                        className="border px-3 py-2 border-gray-400"
                      />
                  </div>
                  
                  <div className='flex flex-col'>
                       <label htmlFor="" className='mb-1'>Postal code </label>
                      <input
                      id="postalCode"
                        value={postalCode}
                        onChange={(e) => setPostalCode(e.target.value)}
                        type="text"
                        placeholder="Postal code (optional)"
                        className="border px-3 py-2 border-gray-400"
                      />
                  </div>
                </div>
                <label htmlFor="">Phone </label>
                <input
                 id="phone"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  type="text"
                  placeholder="Phone"
                  className="w-full border px-3 py-2 border-gray-400"
                />
                
                <label className="flex items-center gap-2 text-sm">
                  <input type="checkbox" /> Save this information
                </label>
              </div>
            </div>

            {/* Payment */}
<div className="mb-6">
  <h3 className="font-medium mb-3">Payment</h3>
  <div className="space-y-3 border border-gray-400">
    <label
      className={`flex items-center gap-2 p-3 cursor-pointer 
        ${payment === "paystack" ? "bg-[#ffddc7]" : ""}`}
    >
      <input
        type="radio"
        name="payment"
        value="paystack"
        checked={payment === "paystack"}
        onChange={() => setPayment("paystack")}
        className="accent-orange-500 border border-orange-400"
      />
      <span className="flex items-center">Paystack</span>
      <span className="text-[10px] text-gray-500 lg:w-full sm:w-full">
        You'll be redirected to pay securely
      </span>
    </label>

    <label
      className={`flex items-center gap-2 p-3 cursor-pointer 
        ${payment === "bank" ? "bg-[#ffddc7]" : ""}`}
    >
      <input
        type="radio"
        name="payment"
        value="bank"
        checked={payment === "bank"}
        onChange={() => setPayment("bank")}
        className="accent-orange-500 border border-orange-400"
      />
      <span className="flex items-center">Bank transfer</span>
    </label>
  </div>
</div>


            <button
            onClick={handleCheckout}
             className="w-full mt-6 bg-[#fb6605] text-white font-semibold py-3 rounded-md hover:bg-orange-600 transition">
              Pay Now
            </button>
          </div>

          {/* RIGHT SIDE - ORDER SUMMARY */}
          <div className="lg:col-span-4">
            <div className="bg-[#fff5e9] p-6">
              

              <div className="space-y-5">
                {cart.map((item, index) => (
                  <div
                    key={index}
                    className="flex items-start justify-between pb-3"
                  >
                    <div className="flex items-start gap-3">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-25 h- object-cover"
                      />
                      <div className="flex flex-col">
                        <p className="text-sm font-medium">
                        {item.name}
                      </p>
                      <br />
                    <p className="font-semibold">
  ₦{((item.productId?.price || 0) * (item.quantity || 0)).toLocaleString()}
</p>
<span className="mt-2 w-6 h-6 flex items-center justify-center bg-orange-500 text-white text-xs font-bold rounded-full">
  {item.quantity}
</span>

                      </div>
                      
                    </div>
                    
                  </div>
                ))}
              </div>

              {/* Discount input */}
              <div className="flex gap-2 mt-6">
                <input
                  type="text"
                  placeholder="Discount code or gift card"
                  className="flex-1 border border-orange-500 px-3 py-2 "
                />
                <button className="bg-[#ffb07c] text-black px-5 hover:bg-[#fb6605] hover:text-white">
                  Apply
                </button>
              </div>

              {/* Totals */}
              <div className="mt-6 text-sm space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping fee</span>
                  <span>₦{shipping.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>VAT</span>
                  <span>₦{vat.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-4 pt-4 flex justify-between font-semibold text-lg">
                <span>Total</span>
                <span>₦{total.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>  
  )
}

export default Checkout
