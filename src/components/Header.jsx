'use client'
import React from 'react'
import { ShoppingCart } from 'lucide-react'

const Header = () => {

  return (
    <div className='flex justify-between items-center p-5 px-12 lg:px-16 bg-teal-600 text-white'>
      <h1 className='text-4xl font-bold'>Logo</h1>
    <div className='flex justify-between items-center w-2/3'>
    <input className='border-1 p-2 px-4 outline-none rounded-md w-3/4' type="text" placeholder="Search for products...."
     />
      <button className='text-white bg-teal-800 px-7 py-2 rounded-md flex  gap-x-3 items-center'>
      <ShoppingCart fontSize={10}  /> Cart
    </button>
    </div>
    </div>
  )
}

export default Header