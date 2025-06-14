'use client'
import React, { createContext, useContext, useState, useEffect, Suspense } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { fetchProducts, fetchCategories } from '../lib/api'

const StoreContext = createContext()

export const StoreProvider = ({ children }) => {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <StoreProviderContent>{children}</StoreProviderContent>
    </Suspense>
  )
}

const StoreProviderContent = ({ children }) => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [priceRange, setPriceRange] = useState({ min: 0, max: 1000 })
  const [searchQuery, setSearchQuery] = useState('')
  const [cart, setCart] = useState([])
  const searchParams = useSearchParams();
  
  const router = useRouter()

  useEffect(() => {
    const savedCart = localStorage.getItem('cart')
    if (savedCart) {
      setCart(JSON.parse(savedCart))
    }
  }, [])

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart))
  }, [cart])

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
    if (searchQuery) params.set('search', searchQuery)
        
    router.push(`?${params.toString()}`)
  }, [selectedCategory, priceRange, searchQuery, router])

  useEffect(() => {
    const category = searchParams.get('category')
    const minPrice = searchParams.get('minPrice')
    const maxPrice = searchParams.get('maxPrice')
    const search = searchParams.get('search')

    if (category) setSelectedCategory(category)
    if (minPrice) setPriceRange(prev => ({ ...prev, min: Number(minPrice) }))
    if (maxPrice) setPriceRange(prev => ({ ...prev, max: Number(maxPrice) }))
    if (search) setSearchQuery(search)
  }, [searchParams])

  useEffect(() => {
    let filtered = [...products]
   
    if (selectedCategory !== 'all') {
      filtered = filtered.filter(product => product.category === selectedCategory)
    }

    filtered = filtered.filter(
      product => product.price >= priceRange.min && product.price <= priceRange.max
    )

    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      filtered = filtered.filter(
        product => 
          product.title.toLowerCase().includes(query) ||
          product.description.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      )
    }

    setFilteredProducts(filtered)
  }, [products, selectedCategory, priceRange, searchQuery])

  const addToCart = (product, quantity = 1) => {
    setCart(prevCart => {
      const existingItem = prevCart.find(item => item.id === product.id)
      
      if (existingItem) {
        return prevCart.map(item =>
          item.id === product.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        )
      }
      
      return [...prevCart, { ...product, quantity }]
    })
  }

  const removeFromCart = (productId) => {
    setCart(prevCart => prevCart.filter(item => item.id !== productId))
  }

  const updateCartItemQuantity = (productId, quantity) => {
    if (quantity < 1) return
    
    setCart(prevCart =>
      prevCart.map(item =>
        item.id === productId
          ? { ...item, quantity }
          : item
      )
    )
  }

  const clearCart = () => {
    setCart([])
  }

  const getCartTotal = () => {
    return cart.reduce((total, item) => total + (item.price * item.quantity), 0)
  }

  const value = {
    products: filteredProducts,
    categories,
    loading,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange,
    searchQuery,
    setSearchQuery,
    cart,
    addToCart,
    removeFromCart,
    updateCartItemQuantity,
    clearCart,
    getCartTotal
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
