import React from 'react'
import Filters from './Filters'
import ProductListing from './ProductListing'

const ProductCard = () => {
  return (
    <div className='flex p-9 px-12 lg:px-16 gap-x-14 w-full justify-between items-start'>
      <Filters />
      <ProductListing />
    </div>
  )
}

export default ProductCard
