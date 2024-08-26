import React, { useContext, useEffect, useState } from 'react'
import CategorySlider from '../CategorySlider/CategorySlider';
import HomeSlider from '../HomeSlider/HomeSlider';
import Products from '../Products/Products';

export default function Home() {

  useEffect(() => {
    document.title = 'FreshCart: Home';
  }, []);

  return (
    <>
      <div className="px-4">
        <HomeSlider />
        <CategorySlider />
      </div>
      <Products />
    </>
  )
}
