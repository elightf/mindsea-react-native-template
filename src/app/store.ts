import { configureStore, createSerializableStateInvariantMiddleware } from '@reduxjs/toolkit'
import appReducer from './appSlice'

export const store = configureStore({
  reducer: {
    app: appReducer
  },
  middleware: getDefaultMiddleware => getDefaultMiddleware({serializableCheck: false})
})
