import { configureStore } from '@reduxjs/toolkit'
import { movieApi } from 'src/features/movie/service/movieService'

const store = configureStore({
  reducer: {
    [movieApi.reducerPath]: movieApi.reducer
  },
  middleware(getDefaultMiddleware) {
    return getDefaultMiddleware().concat(movieApi.middleware)
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store
