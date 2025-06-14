'use client'
import React, { createContext, useContext, useState, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchProducts, fetchCategories } from '../lib/api'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const searchParams = useSearchParams();
  
  const router = useRouter()

  useEffect(() => {
    const loadData = async () => {
      try {
        const [productsData, categoriesData] = await Promise.all([
          fetchProducts(),
          fetchCategories()
        ])
        setProducts(productsData)
        setFilteredProducts(productsData)
        setCategories(categoriesData)
      } catch (error) {
        console.error('Error loading data:', error)
      } finally {
        setLoading(false)
      }
    }
    loadData()
  }, [])

  useEffect(() => {
    const params = new URLSearchParams()
    if (selectedCategory !== 'all') params.set('category', selectedCategory)

    if (priceRange.min > 0) params.set('minPrice', priceRange.min)
    if (priceRange.max < 1000) params.set('maxPrice', priceRange.max)
        
        router.push(`?${params.toString()}`)
  }, [selectedCategory, priceRange])

  useEffect(() => {
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')

    if (category) setSelectedCategory(category)
    if (minPrice) setPriceRange(prev => ({ ...prev, min: Number(minPrice) }))
    if (maxPrice) setPriceRange(prev => ({ ...prev, max: Number(maxPrice) }))
  }, [])

  useEffect(() => {
    let filtered = [...products]
   

    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    )

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange])

  const value = {
    products: filteredProducts,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
  }

  return (
    <StoreContext.Provider value={value}>
      {children}
    </StoreContext.Provider>
  )
}

export const useStore = () => {
  const context = useContext(StoreContext)
  if (!context) {
    throw new Error('useStore must used within a StoreProvider')
  }
  return context
} 
