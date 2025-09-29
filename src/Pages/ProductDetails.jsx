import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { FaInstagram, FaQuoteRight } from "react-icons/fa";
import { FiArrowRight, FiShoppingCart } from "react-icons/fi";
//import { fetchProtected } from "../utils"; // 
import axios from "axios";
import { toast } from "react-toastify";

function ProductDetails({ addToCart }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [product, setProduct] = useState(null);
  const [size, setSize] = useState("20 ml");
  const [qty, setQty] = useState(1);
  const [loading, setLoading] = useState(true);

  const sizes = ["15 ml", "20 ml"];

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await  axios.get(`https://skinbackend-ew51.onrender.com/api/products/${id}`);
        //const data = await res.json();
        setProduct(res.data);
      } catch (error) {
        console.error("Error fetching product:", error);
        toast.error("Failed to load product details.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) {
    return <p className="text-center mt-10">Loading product details...</p>;
  }

  if (!product) {
    return <p className="text-center mt-10">No product details found 😢</p>;
  }

  return (
    <section className="bg-[#fff5e9]">
      <div className="max-w-6xl mx-auto px-4 py-30 bg-[#fff5e9]">
        {/* Back Arrow */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center text-black mb-4"
        >
          <AiOutlineArrowLeft className="mr-2" />
        </button>

        {/* Product Title */}
        <h1 className="text-2xl font-semibold mb-6">{product.name}</h1>

        <div className="grid md:grid-cols-2 gap-8">
          {/* Image */}
          <div className="overflow-hidden rounded-lg">
           <img
  src= {product.image? `https://skinbackend-ew51.onrender.com${product.image}` : "/uploads/default.png"}   // ✅ prepend backend URL
  alt={product.name}
  className="rounded-lg transition-transform duration-500 transform hover:scale-110"
/>

          </div>

          {/* Product Info */}
          <div className="mb-6">
            <div className="flex w-full justify-between">
              <p className="text-3xl font-semibold mb-2">Price</p>
              <p className="text-xl font-bold mb-4">₦ {product.price}</p>
            </div>

            {/* Size Selector */}
            <div className="flex w-full justify-between">
              <p className="font-semibold text-3xl mb-6">Size</p>
              <div className="flex gap-3 mb-4">
                {sizes.map((s) => (
                  <button
                    key={s}
                    onClick={() => setSize(s)}
                    className={`px-4 py-2 border rounded-lg ${
                      size === s
                        ? "bg-orange-500 text-white"
                        : "bg-white border-gray-300"
                    }`}
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>

            {/* Quantity Selector */}
            <div className="flex w-full justify-between">
              <p className="font-semibold text-3xl mb-6">Qty</p>
              <div className="flex items-center border border-[#fb6605] w-28 mb-6">
                <button
                  onClick={() => setQty(Math.max(1, qty - 1))}
                  className="px-3 py-1"
                >
                  -
                </button>
                <span className="flex-1 text-center">{qty}</span>
                <button onClick={() => setQty(qty + 1)} className="px-3 py-1">
                  +
                </button>
              </div>
            </div>

            {/* Buttons */}
            <button
              onClick={() => addToCart(product, qty, size)}
              className="w-full border border-[#fb6605] py-3 mb-3 hover:bg-orange-500 hover:text-white"
            >
              Add to cart
            </button>
            <button
  onClick={() =>
    navigate("/checkout", {
      state: {
        cart: [
          {
            productId: product,
            quantity: qty,
            size: size,
          },
        ],
        subtotal: product.price * qty,
      },
    })
  }
  className="w-full border border-[#fb6605] py-3 mb-3 hover:bg-orange-500 hover:text-white"
>
  Buy now
</button>
    </div>
        </div>

        {/* Description */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-2">Description</h2>
          <p className="text-gray-600 mb-6">{product.description}</p>

          <h2 className="text-lg font-bold mb-2">How To Use</h2>
          <p className="text-gray-600">{product.howToUse}</p>
        </section>

        {/* Reviews */}
        <section className="mt-10">
          <h2 className="text-lg font-bold mb-4 flex items-center">
            Customer’s reviews <span className="ml-2">🕑</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-4">
            {product.reviews?.length > 0 ? (
              product.reviews.map((review, i) => (
                <div
                  key={i}
                  className="bg-[#e7e1d7] p-4 rounded-lg flex flex-col justify-between"
                >
                  <div>
                    <div className="flex justify-between">
                      <p className="font-semibold mb-2 border border-gray-400 w-20 rounded text-center">
                        @{review.user}
                      </p>
                      <span>
                        <FaQuoteRight className="text-[#a7a7a7]" />
                      </span>
                    </div>
                    <p className="text-gray-600 text-sm">{review.text}</p>
                  </div>
                  <div className="mt-4 text-sm flex items-center justify-end">
                    Reviewed on ig <FaInstagram className="ml-2" />
                  </div>
                </div>
              ))
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>
        </section>
      </div>
    </section>
  );
}

export default ProductDetails;
