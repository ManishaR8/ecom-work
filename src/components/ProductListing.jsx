'use client'
import React from 'react'

const ProductListing = () => {
  return (
    <div className="p-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">

        <div
          className="bg-white rounded-lg w-56 overflow-hidden transition-shadow duration-300 cursor-pointer hover:shadow-lg"

        >
          <div className="h-60 overflow-hidden">
            <img

              className="w-full h-full object-contain p-1"
            />
          </div>
          <div className="p-2">
            <h2 className="text-lg font-semibold text-gray-800 mb-2 line-clamp-2">title</h2>
            <div className="flex justify-between items-center">
              <span className="text-xl font-bold text-teal-600">$28</span>
            </div>
          </div>
          <div className='flex justify-start items-center w-full'>
            <button
              className='bg-teal-600 text-white px-4 py-2 rounded-md cursor-pointer w-full'
              onClick={(e) => {
                e.stopPropagation()
              }}
            >
              Add to Cart
            </button>
          </div>
        </div>

      </div>
    </div>
  )
}

export default ProductListing