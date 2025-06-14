import React from 'react'
import Cart from '../../components/Cart'
import Header from '../../components/Header'

export default function CartPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1480px] mx-auto p-9 px-12 lg:px-16 py-14">
        <Cart />
      </div>
    </main>
  )
}