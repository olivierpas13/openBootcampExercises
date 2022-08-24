import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer
  },
});
export const AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export default store;
