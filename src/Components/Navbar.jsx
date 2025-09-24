import React, { useEffect, useState } from 'react';
import logo from '../assets/images/logo.png';
import { AiOutlineSearch, AiOutlineLogout } from 'react-icons/ai';
import { FiShoppingCart } from 'react-icons/fi';
import { NavLink, useLocation, useNavigate } from 'react-router-dom';

function Navbar({ isHome, cart = [] }) {
  const location = useLocation();
  const navigate = useNavigate();
  const [role, setRole] = useState(localStorage.getItem("role"));
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [searchOpen, setSearchOpen] = useState(false);
const [searchQuery, setSearchQuery] = useState("");


  useEffect(() => {
    const handleStorageChange = () => {
      setRole(localStorage.getItem("role"));
      setIsLoggedIn(!!localStorage.getItem("token"));
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, []);

  const hideAuthLinks = ["/login", "/signup"];

  const linkClass = 'text-gray-500 hover:text-[#fb6605] px-3 py-2 transition';
  const activeLinkClass = 'text-[#fb6605] underline font-bold px-3 py-2 transition';

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setRole(null);
    setIsLoggedIn(false);
    navigate("/login");
  };

  return (
  <nav
    className={`fixed w-full border-b border-white z-50 ${
      isHome ? "bg-white" : "bg-[#fff5e9]"
    }`}
  >
    <div className="w-full flex items-center justify-between h-20 px-4">
      {/* LEFT (Logo) */}
      <div
        className="flex items-center space-x-2 cursor-pointer"
        onClick={() => navigate("/", { state: { scrollTo: "top" } })}
      >
        <img src={logo} alt="Me logo" className="h-14 w-auto ml-16" />

        <span className="hidden md:block text-[#fb6605] italic text-2xl font-bold md:text-3xl">
          SkinCare
        </span>
      </div>

      {/* CENTER (Nav links) */}
      <div className="hidden lg:flex space-x-6 text-base md:text-xl">
        <NavLink
          to="/"
          state={{ scrollTo: "top" }}
          className={({ isActive }) =>
            isActive ? activeLinkClass : linkClass
          }
        >
          Home
        </NavLink>
        {location.pathname !== "/" && (
          <NavLink
            to="/products"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            Shop
          </NavLink>
        )}
        <NavLink
          to="/about"
          state={{ scrollTo: "footer" }}
          className={({ isActive }) =>
            isActive ? activeLinkClass : linkClass
          }
        >
          About
        </NavLink>
        <NavLink
          to="/contact"
          state={{ scrollTo: "footer" }}
          className={({ isActive }) =>
            isActive ? activeLinkClass : linkClass
          }
        >
          Contact
        </NavLink>
        {role === "admin" && (
          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            Admin Dashboard
          </NavLink>
        )}
      </div>

      {/* RIGHT (Auth + Icons) */}
<div className="flex items-center space-x-6 pr-4 text-[#fb6605]">

  {!hideAuthLinks.includes(location.pathname) && (
    <div className="flex items-center space-x-3">
      {isLoggedIn ? (
        <AiOutlineLogout
          size={28}
          className="text-red-500 cursor-pointer hover:text-red-600 transition"
          title="Logout"
          onClick={handleLogout}
        />
      ) : (
        <>
          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            Login
          </NavLink>
          <NavLink
            to="/signup"
            className={({ isActive }) =>
              isActive ? activeLinkClass : linkClass
            }
          >
            Sign Up
          </NavLink>
        </>
      )}
    </div>
  )}

  {/* Search */}
  <div className="relative flex items-center">
    {searchOpen && (
      <input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="transition-all duration-300 ml-2 px-2 py-0.3 w-30 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#fb6605]"
      />
    )}
    <button
      onClick={() => setSearchOpen(!searchOpen)}
      aria-label="Search"
      className="p-1"
    >
      <AiOutlineSearch size={25} className="cursor-pointer" />
    </button>
  </div>

  {/* Cart */}
  <NavLink to="/carts" className="relative">
    <FiShoppingCart size={25} className="cursor-pointer" />
    {Array.isArray(cart) && cart.length > 0 && (
      <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full px-2">
        {cart.reduce((total, item) => total + (item.quantity || 0), 0)}
      </span>
    )}
  </NavLink>
</div>

    </div>
  </nav>
);
}
export default Navbar;
