import { createSlice } from '@reduxjs/toolkit'

const productSlice = createSlice({
  name: 'product',
  initialState: {
    categories: null,
    products: null,
  },
  reducers: {
    setCategories(state, action) {
      state.categories = action.payload
    },
    setProducts(state, action) {
      state.products = action.payload
    },
    deleteProduct(state, action) {
      state.products = state.products.filter(
        product => product.id !== action.payload
      )
    },
  },
})

export const productActions = productSlice.actions

export default productSlice
