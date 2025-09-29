import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider } from 'react-router-dom';
import MainLayout from "./Layout/MainLayout";
import HomePage from "./Pages/HomePage";
import Checkout from "./Pages/Checkout";
//import PaymentPay from "./Pages/PaymentPay";
//import Success from "./Pages/Success";
import Navbar from "./Components/Navbar";
import Landing from "./Components/Landing";
import ProductList from "./Components/ProductList";
import LoginPage from './Pages/LoginPage';
import SignupPage from './Pages/SignupPage';
import HomeCarts from './Pages/HomeCarts';
import AdminProducts from './Components/AdminProducts';
import ProductDetails from './Pages/ProductDetails';
import {useEffect, useState} from 'react';
import ProtectedRoute from './Components/ProtectedRoutes';
import {ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import PaymentStatus from './Pages/PaymentStatus';
//import PaymentStatus from './Components/paymentsuccess';





function App() {

 
const [cart, setCart] = useState([]); 


useEffect(() => {
    const fetchCart = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return; // don’t fetch if not logged in

        const res = await fetch("https://skinbackend-ew51.onrender.com/api/cart/get", {
          headers: { Authorization: `Bearer ${token}` },
        });

        const data = await res.json();
        setCart(data.items || []);
      } catch (err) {
        console.error("Error fetching cart:", err);
        toast.error("Failed to load cart. Please try again.");
      }
    };

    fetchCart();
  }, []);

const addToCart = async (product, qty = 1) => {
    try {
      const token = localStorage.getItem("token");
      if (!token) return toast.warn("Please login first");

      const res = await fetch("https://skinbackend-ew51.onrender.com/api/cart/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`, 
        },
        body: JSON.stringify({ productId: product._id, quantity: qty }),
      });

      const data = await res.json();
      setCart(data.items); // backend returns updated cart
    } catch (err) {
      console.error("Error adding to cart:", err);
      toast.error("Failed to add to cart. Please try again.");
    }
  };

const handleAdd = async (id) => {
    const item = cart.find((c) => c.productId._id === id);
    if (item) {
      await addToCart(item.productId, 1); // add one more
    }
  };

const handleSubtract = async (id) => {
    const item = cart.find((c) => c.productId._id === id);
    if (item && item.quantity > 1) {
      try {
        const token = localStorage.getItem("token");
        const res = await fetch("https://skinbackend-ew51.onrender.com/api/cart/update", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ productId: id, quantity: item.quantity - 1 }),
        });

        const data = await res.json();
        setCart(data.items);
      } catch (err) {
        console.error("Error subtracting from cart:", err);
        toast.error("Failed to update cart. Please try again.");
      }
    }
  };


  const handleRemove = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const res = await fetch(`https://skinbackend-ew51.onrender.com/api/cart/remove/${id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
       //body: JSON.stringify({ productId: id }),
      });

      const data = await res.json();
      setCart(data.items);
    } catch (err) {
      console.error("Error removing from cart:", err);
      toast.error("Failed to remove item from cart. Please try again.");
    }
  };


const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path='/' element={<MainLayout cart={cart}/>}>
  

      <Route path='landing' element={<Landing />} />

     

 
<Route path="/payment-status" element={<PaymentStatus />} />


      <Route
  path="admin/products"
  element={
    <ProtectedRoute allowedRole="admin">
      <AdminProducts />
    </ProtectedRoute>
  }
/>


      <Route 
        path='/products' 
        element={
          <ProtectedRoute>
            <ProductList addToCart={addToCart} />
          </ProtectedRoute>
        } 
      />

        <Route
        path="products/:id"
        element={
          <ProtectedRoute>
            <ProductDetails addToCart={addToCart} />
          </ProtectedRoute>
        }
        />

      
      <Route 
        path='carts' 
        element={
          <ProtectedRoute>
            <HomeCarts 
              cart={cart} 
              isHome={false}
              onAdd={handleAdd}
              onSubtract={handleSubtract}
              onRemove={handleRemove} 
            />
          </ProtectedRoute>
        } 
      />

      {/* Checkout - Protected */}
      <Route 
        path='/Checkout' 
        element={
          <ProtectedRoute>
            <Checkout />
          </ProtectedRoute>
        } 
      />

      {/* Public routes */}
      <Route path='login' element={<LoginPage />} />
      <Route path='signup' element={<SignupPage />} />
      <Route path='product/:id' element={<ProductDetails addToCart={addToCart} />} />
      <Route path= 'about' element={< HomePage scrollTo='footer' />} />
      <Route path= 'contact' element={< HomePage scrollTo='footer' />} />
      <Route  index element ={< HomePage key="home" scrollTo='top' />} />
      
    </Route>
  )
);
  return (
    <>
     <RouterProvider router={router}/>

      <ToastContainer 
      position="top-right" 
      autoClose={3000} 
      hideProgressBar={false} 
      newestOnTop={false} 
      closeOnClick rtl={false}
      pauseOnFocusLoss 
      draggable pauseOnHover
      theme='colored'
 />
 </>
      
  );
}

export default App
