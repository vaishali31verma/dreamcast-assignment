import { configureStore } from '@reduxjs/toolkit'
import { setupListeners } from '@reduxjs/toolkit/query'
import tableReducer  from '../redux/slice/tableSlice'


export const store = configureStore({
  reducer: {
    table: tableReducer,
  },
  
})

setupListeners(store.dispatch)
