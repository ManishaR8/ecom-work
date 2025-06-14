import React from 'react'

const Filters = () => {
  return (
    <div className='w-60 bg-teal-600 p-4 rounded-lg text-white'>
      <h1>Filters</h1>
      <div className='flex flex-col gap-y-2 mt-4'>
        <h2 className='text-lg  text-white mb-2'>Category</h2>
        <div className='flex flex-col gap-y-2'>
          <div className='flex items-center gap-x-2'>
            <input type='radio' name='category' id='all' />
            <label htmlFor='all'>All</label>
          </div>
          <div className='flex items-center gap-x-2'>
          <input type='radio' name='category' id='electronics' />
          <label htmlFor='electronics'>Electronics</label>
          </div>
          <div className='flex items-center gap-x-2'>
          <input type='radio' name='category' id='clothing' />
          <label htmlFor='clothing'>Clothing</label>
          </div>
          <div className='flex items-center gap-x-2'>
          <input type='radio' name='category' id='books' />
          <label htmlFor='books'>Books</label>
          </div>
          <div className='flex items-center gap-x-2'>
          <input type='radio' name='category' id='furniture' />
          <label htmlFor='furniture'>Furniture</label>
          </div>
        </div>

        <div className='flex flex-col gap-y-2 mt-4'>
          <h2 className='text-lg  text-white mb-2'>Price</h2>
          <div className='flex items-center gap-x-2'>
          <span className='text-white'>$0</span>
            <input type='range' name='price' id='price' />
            <span className='text-white'>$100</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Filters
