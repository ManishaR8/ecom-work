'use client'
import React from 'react'
import { useStore } from '../context/StoreContext'

const Filters = () => {
  const {
    categories,
    selectedCategory,
    setSelectedCategory,
    priceRange,
    setPriceRange
  } = useStore()

  const handleCategoryChange = (e) => {
    const category = e.target.value
    setSelectedCategory(category)
  }

  const handlePriceChange = (e) => {
    const { name, value } = e.target
    setPriceRange(prev => ({
      ...prev,
      [name]: Number(value)
    }))
  }

  return (
    <div className='bg-teal-600 p-4 min-w-60 rounded-md text-white gap-y-4 flex flex-col'>
      <h1 className="text-xl font-semibold">Filters</h1>

      <div>
        <h2 className="text-lg font-medium mb-2">Category</h2>
        <div className="flex flex-col gap-2 mt-2">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="radio"
              name="category"
              value="all"
              checked={selectedCategory === 'all'}
              onChange={handleCategoryChange}
              className="w-4 h-4 accent-teal-600 border-2 border-teal-600 rounded-full"
            />
            <span>All</span>
          </label>
          {categories.map((category) => (
            <label key={category} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category}
                checked={selectedCategory === category}
                onChange={handleCategoryChange}
                className="w-4 h-4 accent-teal-600 border-2 border-teal-600 rounded-full"
              />
              <span className="capitalize">{category}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <h2 className="text-lg font-medium mb-2">Price </h2>
        <div className="space-y-4">
          <div className="flex flex-col gap-2">
            
            <div className="relative h-2">
              <div className="absolute w-full h-2 bg-gray-300 rounded-full"></div>

              <div
                className="absolute h-2 bg-blue-100 rounded-full"
                style={{
                  left: `${(priceRange.min / 1000) * 100}%`,
                  right: `${100 - (priceRange.max / 1000) * 100}%`
                }}
              ></div>

              <input
                type="range"
                name="min"
                value={priceRange.min}
                onChange={handlePriceChange}
                min="0"
                max="999"
                className="absolute w-full h-2 bg-transparent pointer-events-auto z-10 slider-thumb hover:z-20"
                style={{ WebkitAppearance: 'none' }}
              />

              <input
                type="range"
                name="max"
                value={priceRange.max}
                onChange={handlePriceChange}
                min="1"
                max="1000"
                className="absolute w-full h-2 bg-transparent pointer-events-auto z-10 slider-thumb hover:z-20"
                style={{ WebkitAppearance: 'none' }}
              />
            </div>
            <div className="flex justify-between text-sm mt-1">
              <span>${priceRange.min}</span>
              <span>${priceRange.max}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters