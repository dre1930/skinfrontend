import React from 'react'
import { useState } from "react";
import { FiEye, FiEyeOff } from "react-icons/fi";
import { FcGoogle } from "react-icons/fc";
import { FaApple } from "react-icons/fa";
import { Link ,useNavigate } from 'react-router-dom';
//import { fetchProtected } from '../utils';
import { toast } from 'react-toastify'; 

function LoginPage() {
    const [showPassword, setShowPassword] = useState(false);
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate(); 

    const handleLogin = async () => {
      try {
    const res = await fetch("/api/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    const data = await res.json();
    console.log("Login response:", data);
    if (!res.ok) {
      toast.warn(data.msg|| "Login failed. Try again.");
      return;
    }
    localStorage.setItem("token", data.token);
    localStorage.setItem("role", data.user.role);
    console.log("role:",data.user.role) 

    window.dispatchEvent(new Event("storage")); // Notify other tabs

    console.log("saved token:",localStorage.getItem("token"))

    if (data.user.role === "admin") {
      navigate("/admin/products");}
    else{
    navigate("/products");
    }

  } catch (error) {
    console.error("Login error:", error);
    toast.error("An error occurred. Try again later.");
  }

  };

 

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#fff5e9] px-4">
        <div className="w-full max-w-md bg-[#fff5e9] p-8">
        {/* Title */}
        <h2 className="text-3xl font-bold text-gray-900">Sign In</h2>
        <p className="mt-1 text-lg text-gray-700">
          or{" "}
          <Link to="/signup" className="text-orange-500 font-semibold hover:underline">
            create account
          </Link>
        </p>

        {/* Email */}
        <div className="mt-6">
          <input
            type="text"
            placeholder="Email or Phone number"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
        </div>

        {/* Password */}
        <div className="mt-4 relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 rounded-sm p-3 focus:outline-none focus:ring-2 focus:ring-orange-400"
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="absolute right-3 top-3 text-gray-500"
          >
            {showPassword ? <FiEyeOff size={20} /> : <FiEye size={20} />}
          </button>
        </div>

        {/* Remember & Forgot */}
        <div className="mt-4 flex items-center justify-between">
          <label className="flex items-center gap-2 text-gray-700">
            <input type="checkbox" className="accent-orange-500" />
            Remember me
          </label>
          <a href="#" className="text-orange-500 hover:underline text-sm">
            Forgot password?
          </a>
        </div>

        {/* Login Button */}
        <button 
        onClick={handleLogin}
        className="mt-6 w-full bg-orange-500 text-white font-semibold py-3 hover:bg-orange-600 transition">
          Log In
        </button>

        {/* Social Login */}
        <div className="flex justify-center gap-6 mt-6">
          <FcGoogle size={28} className="cursor-pointer" />
          <FaApple size={28} className="cursor-pointer" />
        </div>
      </div>
    </div>
  )
}

export default LoginPage
