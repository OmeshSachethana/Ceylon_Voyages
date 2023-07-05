import { configureStore } from '@reduxjs/toolkit'
import uiSlice from './ui'
import posts from '../reducers/posts'

export function makeStore() {
  return configureStore({
    devTools: true,
    reducer: {
      ui: uiSlice,
      posts: posts,
    },
  })
}

const store = makeStore()

export default store
