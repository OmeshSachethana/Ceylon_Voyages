import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui'

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      ui: uiSlice,
    },
  })
}

const store = makeStore()

export default store
