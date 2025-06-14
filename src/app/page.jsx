import React from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import Footer from '../components/Footer'

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col">
      <Header />
      <div className="flex-1">
        <ProductCard />
      </div>
      <Footer />
    </main>
  )
}