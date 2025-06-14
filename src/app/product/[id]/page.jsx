import React from 'react'
import ProductDetails from '../../../components/ProductDetails'
import Header from '../../../components/Header'

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-[1480px] mx-auto p-9 px-12 lg:px-16 py-14">
        <ProductDetails />
      </div>
    </main>
  )
}
