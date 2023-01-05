import { createSlice } from '@reduxjs/toolkit'

const initialState = ''

const filterSlice = createSlice({
  name: 'filter',
  initialState,
  reducers: {
    setFilter(state, action) {
      const filterValue = action.payload
      state = filterValue
      return state
    }
  }
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer
