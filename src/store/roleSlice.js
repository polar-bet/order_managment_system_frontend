import { createSlice } from '@reduxjs/toolkit'

const roleSlice = createSlice({
  name: 'role',
  initialState: {
    roles: null,
  },
  reducers: {
    setRoles(state, action) {
      state.roles = action.payload
    },
  },
})

export const roleActions = roleSlice.actions

export default roleSlice
