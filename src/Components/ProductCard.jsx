import React from 'react'
import { Link ,useNavigate } from 'react-router-dom';

function ProductCard({id, image, name, price, addToCart}) {
const navigate = useNavigate();
  return (
    <Link 
        to={`/product/${id}`} 
    //   state={{ id, image, name, price, description }} 
      className="block">

        <div className="bg-[#fff5e9] rounded-md overflow-hidden w-64">
            {/* Image with zoom effect */}
       <img 
  src= {image}// ✅ add base URL
  alt={name}
  className="w-64 h-72 object-cover rounded-md transition-transform duration-500 ease-in-out transform hover:scale-110"
/>

             {/* Product Name + Dropdown */}
        <div className='mt-5 space-y-2 flex justify-between'>
            <h3 className='text-lg font-medium text-gray-800'>{name}</h3>
            <div className='flex items-center justify-between'>
                <select className='px-2 py-1 rounded text-sm'>
                    {[1, 2, 3, 4, 5].map(num => (
                        <option key={num} value={num}>{num}</   option>
                    ))}
                </select>
            </div>
        </div>

        {/* Price + Button */}
        <div className='flex space-x-20 justify-between mt-5'>
             <span className='text-gray-700 font-bold '>₦{price}</span>
            <button 
            onClick={() => addToCart({_id: id, image, name, price })}
            className='w-1/2 bg-[#fb6605] hover:bg-orange-600 text-white py-2 rounded font-semibold transition'>Add to Cart</button>
        </div>
       
    </div>
    </Link>
  );
};

export default ProductCard