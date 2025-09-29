//import React, { use } from 'react';
import Navbar from './Navbar';
import ProductCard from './ProductCard';
import axios from 'axios';
import { useEffect,useState } from 'react';
import { toast } from 'react-toastify';
//import products from '../data/products';

function ProductList({addToCart}) {
  const [products, setProducts] = useState([]);


  useEffect(() => {
    axios.get('https://skinbackend-ew51.onrender.com/api/products')
       .then(res => setProducts(res.data))
        .catch(err => console.error("Error fetching products:", err));
        toast.success("products")
      
  }, []);
      
       
  return (
    <section>
      <Navbar isHome={false}/>
      <br />
      <br />
      <section className='bg-[#fff5e9] min-h-screen pt-8 pb-16 px-4 md:px-12 lg:px-20'>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {products.map((product)=>(
            <ProductCard 
          key={product._id}
          id={product._id}
          image={product.image? `https://skinbackend-ew51.onrender.com${product.image}` : "/uploads/default.png"}
          name={product.name}
          price={product.price}
          addToCart={addToCart}
          />
          ))}
        </div>
      </section>

    </section>
  )
}

export default ProductList
