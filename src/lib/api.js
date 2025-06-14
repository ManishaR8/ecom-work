const BASE_URL = 'https://fakestoreapi.com'

export const fetchProducts = async (category = '') => {
  try {
    const url = category 
      ? `${BASE_URL}/products/category/${category}`
      : `${BASE_URL}/products`
    
    const response = await fetch(url)
    if (!response.ok) {
      throw new Error('Failed to fetch products')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching products:', error)
    throw error
  }
}

export const fetchCategories = async () => {
  try {
    const response = await fetch(`${BASE_URL}/products/categories`)
    if (!response.ok) {
      throw new Error('Failed to fetch categories')
    }
    return await response.json()
  } catch (error) {
    console.error('Error fetching categories:', error)
    throw error
  }
}
