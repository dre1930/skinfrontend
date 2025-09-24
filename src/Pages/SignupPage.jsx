 import React, { useState } from 'react';
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

function SignupPage() {
  const [formData, setFormData] = useState({
    surname: '',
    firstName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });

  const navigate = useNavigate(); // hook to redirect

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Optional: simple validation
    if (formData.password !== formData.confirmPassword) {
      toast.warn("Passwords do not match!");
      return;
    }
    
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `${formData.surname} ${formData.firstName}`,
          email: formData.email,
          password: formData.password
        }),
      });

      const data = await res.json();
      console.log("Backend response:", data);



      if (res.ok) {
        toast.success("Signup successful! Please login.");
        navigate("/login"); // redirect to login page
      } else {
        toast.warn(data.message || "Signup failed. Try again.");
      }



      
    } catch (error) {
      console.error("Signup error:", error);
      toast.warn("An error occurred. Try again later.");
    }
  };

  

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff5e9] px-4">
      <div className="w-full max-w-lg bg-[#fff5e9] p-8">
        <h2 className="text-3xl font-bold text-gray-900">Create Account</h2>
        <p className="mt-1 text-lg text-gray-700">
          Or <Link to="/login" className="text-orange-500 font-semibold hover:underline">Sign In</Link>
        </p>

        <form onSubmit={handleSubmit}>
          <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
            <input
              type="text"
              name='surname'
              placeholder="Surname"
              value={formData.surname}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
            <input
              type="text"
              name='firstName'
              placeholder="FirstName"
              value={formData.firstName}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="email"
              name='email'
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              name='password'
              placeholder="Password"
              value={formData.password}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <div className="mt-4">
            <input
              type="password"
              name='confirmPassword'
              placeholder="ConfirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className="border border-gray-300 p-3 rounded-sm w-full focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>

          <button 
            type='submit'
            className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 hover:bg-orange-600 transition"
          >
            Sign Up
          </button>
        </form>

        <div className="flex justify-center gap-6 mt-6">
          <FcGoogle size={28} className="cursor-pointer" />
          <FaApple size={28} className="cursor-pointer" />
        </div>
      </div>
    </div>
  );
}

export default SignupPage;
