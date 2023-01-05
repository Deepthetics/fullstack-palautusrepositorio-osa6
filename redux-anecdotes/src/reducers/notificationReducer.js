import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    displayNotification(state, action) {
      const notification = action.payload
      state = notification
      return state
    },
    clearNotification(state) {
      state = null
      return state
    }
  }
})

export const { displayNotification, clearNotification } = notificationSlice.actions

export const setNotification = (notification, duration) => {
  return dispatch => {
    dispatch(displayNotification(notification))
    setTimeout(() => {
      dispatch(clearNotification())
    }, duration*1000)
  }
}

export default notificationSlice.reducer
