import React from 'react'
import ProductDetails from '../../../components/ProductDetails'
import Header from '../../../components/Header'

export default function ProductPage() {
  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      <div className="max-w-7xl mx-auto px-4 py-8">
        <ProductDetails />
      </div>
    </main>
  )
}
