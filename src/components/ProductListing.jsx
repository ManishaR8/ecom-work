'use client'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useStore } from '../context/StoreContext'

const ProductListing = () => {
  const router = useRouter()
  const { products, loading, addToCart } = useStore()

  const handleProductClick = (productId) => {
    router.push(`/product/${productId}`)
  }

  const handleAddToCart = (e, product) => {
    e.stopPropagation()
    addToCart(product)
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2358b3]"></div>
      </div>
    )
  }

  if (products.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">No products found</h2>
      </div>
    )
  }

  return (
    <div className="p-1 w-full">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-9">
        {products.map((product) => (
          <div 
            key={product.id} 
            className="bg-white rounded-lg w-56 flex flex-col justify-between overflow-hidden transition-shadow duration-300 cursor-pointer hover:shadow-lg"
            onClick={() => handleProductClick(product.id)}
          >
            <div className="h-60 overflow-hidden">
              <img 
                src={product.image} 
                alt={product.title}
                className="w-full h-full object-contain p-1"
              />
            </div>
            <div className="p-2">
              <h2 className="text-lg font-semibold text-black mb-2 line-clamp-2">{product.title}</h2>
              <div className="flex justify-between items-center">
                <span className="text-xl font-bold text-black">${product.price}</span>
              </div>
            </div>
            <div className='flex justify-start items-center w-full'>
              <button 
                className='bg-[#2358b3] text-white px-4 py-2 rounded-md cursor-pointer w-full hover:bg-teal-700 transition-colors'
                onClick={(e) => handleAddToCart(e, product)}
              >
                Add to Cart
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductListing