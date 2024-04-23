import {configureStore} from '@reduxjs/toolkit';
import { authReducer } from './reducers/authReducer';
import { productReducer } from './reducers/productReducer';
import { cartReducer } from './reducers/cartReducer';


export const store = configureStore({
    reducer:{
      auth: authReducer, 
      productReducer,
      cartReducer
    },
    middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
})