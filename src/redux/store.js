import { configureStore } from '@reduxjs/toolkit'
import authReducer from './auth/authSlice';
import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist'
import bookReducer from './books/bookSlice';
import borrowReducer from './borrowHistory/borrowHistorySlice'

const persistConfig = {
  key: 'root',
  storage
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer);

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    book: bookReducer,
    borrowHistory: borrowReducer 
  }
});
