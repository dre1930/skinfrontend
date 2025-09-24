import React, {use, useEffect} from 'react'
import Landing from '../Components/Landing';
//import Footer from '../Components/Footer';
//import ProductList from '../Components/ProductList';
//import HomeCarts from './HomeCarts';

function HomePage({ scrollTo}) {

  useEffect(() => {
    if (scrollTo === 'footer') {
      const footer = document.getElementById('footer');
      if (footer) {
        footer.scrollIntoView({ behavior: 'smooth' });
      }
    } else if (scrollTo === 'top') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [scrollTo]);
  return (
    <>
        <Landing />
         
        {/* <ProductList /> */}
        
        
    </>
  )
}

export default HomePage