'use client'
import React from 'react'
import { useStore } from '../context/StoreContext'
import { Trash2 } from 'lucide-react'

const Cart = () => {
  const { 
    cart, 
    removeFromCart, 
    updateCartItemQuantity, 
    clearCart,
    getCartTotal 
  } = useStore()

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your cart is empty</h2>
        <p className="text-gray-600">Add some products to your cart to see them here.</p>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-2xl font-bold text-gray-800">Shopping Cart</h1>
        <button
          onClick={clearCart}
          className="text-gray-600 hover:text-red-700 text-sm font-medium cursor-pointer"
        >
          Clear Cart
        </button>
      </div>

      <div className="space-y-4">
        {cart.map((item) => (
          <div key={item.id} className="flex items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
            <div className="w-24 h-24">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-full object-contain"
              />
            </div>
            
            <div className="flex-1">
              <h3 className="font-medium text-gray-800">{item.title}</h3>
              <p className="text-[#2358b3] font-bold">${item.price}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => updateCartItemQuantity(item.id, item.quantity - 1)}
                className="px-2 py-1 border rounded-md hover:bg-gray-100"
              >
                -
              </button>
              <span className="w-8 text-center">{item.quantity}</span>
              <button
                onClick={() => updateCartItemQuantity(item.id, item.quantity + 1)}
                className="px-2 py-1 border rounded-md hover:bg-gray-100"
              >
                +
              </button>
            </div>

            <div className="text-right">
              <p className="font-bold text-gray-800">${(item.price * item.quantity).toFixed(2)}</p>
            </div>

            <button
              onClick={() => removeFromCart(item.id)}
              className="text-gray-600 hover:text-red-700 p-2 cursor-pointer"
            >
              <Trash2 size={20} />
            </button>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-white p-6 rounded-lg shadow-sm">
        <div className="flex justify-between items-center text-xl font-bold text-gray-800">
          <span>Total:</span>
          <span>${getCartTotal().toFixed(2)}</span>
        </div>
        
        <button className="w-full mt-6 bg-[#2358b3] text-white py-3 rounded-md hover:bg-teal-700 transition-colors">
          Proceed to Checkout
        </button>
      </div>
    </div>
  )
}

export default Cart
