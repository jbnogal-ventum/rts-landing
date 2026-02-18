import { configureStore } from '@reduxjs/toolkit'
import colorPointsReducer from './colorPointsSlice'
import nodeReducer from './nodeSlice'

export const store = configureStore({
  reducer: {
    colorPoints: colorPointsReducer,
    node: nodeReducer,
  },
})
