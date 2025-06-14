'use client'
import React, { useState, useEffect } from 'react'
import { useParams } from 'next/navigation'
import { fetchProducts } from '../lib/api'
import { useStore } from '../context/StoreContext'

const ProductDetails = () => {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [loading, setLoading] = useState(true)
  const { addToCart } = useStore()

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const products = await fetchProducts()
        const foundProduct = products.find(p => p.id === parseInt(id))
        setProduct(foundProduct)
      } catch (error) {
        console.error('Error loading product:', error)
      } finally {
        setLoading(false)
      }
    }
    loadProduct()
  }, [id])

  const handleAddToCart = () => {
    if (product) {
      addToCart(product, quantity)
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#2358b3]"></div>
      </div>
    )
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Product not found</h2>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      <div className="bg-white p-8 rounded-lg shadow-sm">
        <div className="aspect-square relative">
          <img
            src={product.image}
            alt={product.title}
            className="w-full h-full object-contain"
          />
        </div>
      </div>

      <div className="space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
 
        <p className="text-3xl font-bold text-[#2358b3]">${product.price}</p>
        
        <p className="text-gray-600 leading-relaxed">{product.description}</p>
        
        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Category:</span>
          <span className="px-3 py-1 bg-gray-100 rounded-full text-gray-600 capitalize">
            {product.category}
          </span>
        </div>

        <div className="flex items-center gap-4">
          <span className="text-gray-700 font-medium">Quantity:</span>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              -
            </button>
            <span className="w-12 text-center">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="px-3 py-1 border rounded-md hover:bg-gray-100 transition-colors cursor-pointer"
            >
              +
            </button>
          </div>
        </div>

        <button 
          className="w-full bg-[#2358b3] text-white py-3 rounded-md hover:bg-[#2358b3] transition-colors cursor-pointer"
          onClick={handleAddToCart}
        >
          Add to Cart
        </button>
      </div>
    </div>
  )
}

export default ProductDetails