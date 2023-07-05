/* eslint-disable no-param-reassign */
import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  showLoader: false,
}

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleLoader(state, action) {
      state.showLoader = action.payload
    },
  },
})

export const { toggleLoader } = uiSlice.actions

export default uiSlice.reducer
