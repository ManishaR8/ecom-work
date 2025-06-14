import React from 'react'
import Header from '../components/Header'
import ProductCard from '../components/ProductCard'
import { StoreProvider } from '../context/StoreContext'
export default function Home() {
  return (
    <StoreProvider>
      <main className="min-h-screen flex flex-col">
        <Header />
        <div className="flex-1">
          <ProductCard />
        </div>
      </main>
    </StoreProvider>
  )
}

