'use client'
import React, { useState } from 'react'
import { ShoppingCart } from 'lucide-react'
import { useStore } from '../context/StoreContext'
import { useRouter, usePathname } from 'next/navigation'
import { Search } from 'lucide-react';

const Header = () => {
  const { searchQuery, setSearchQuery } = useStore()
  const [inputValue, setInputValue] = useState(searchQuery)
  const router = useRouter()
  const pathname = usePathname()

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      setSearchQuery(inputValue)
      setInputValue('')

      if (pathname.startsWith('/product/')) {
        const searchParams = new URLSearchParams()
        if (inputValue) searchParams.set('search', inputValue)
        router.replace(`/?${searchParams.toString()}`)
      } else {
        const searchParams = new URLSearchParams()
        if (inputValue) searchParams.set('search', inputValue)
        router.replace(`/?${searchParams.toString()}`)
      }
    }
  }

  const handleLogoClick = () => {
    setSearchQuery('')
    setInputValue('')
    router.replace('/')
  }

  return (
    <div className='flex justify-between items-center p-5 px-12 lg:px-16 bg-teal-600 text-white'>
      <h1 className='text-4xl font-bold cursor-pointer w-1/4' onClick={handleLogoClick}>Logo</h1>
      <div className='flex justify-end items-center w-full'>
        <div className='relative flex justify-between w-[60%] items-center'>
          <input
            className='border-1 p-2 px-4 outline-none rounded-md w-[90%] text-white relative flex items-center gap-x-2 pl-12'
            type="text"
            placeholder="Search for products...."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyDown={handleSearch}
          />

          <Search className='w-5 h-5 absolute left-3 top-2.5' />
        </div>
        <button className='text-white bg-teal-800 px-7 py-2 rounded-md flex gap-x-3 items-center'>
          <ShoppingCart fontSize={10} /> Cart
        </button>
      </div>
    </div>
  )
}

export default Header