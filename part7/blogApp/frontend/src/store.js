import { configureStore } from '@reduxjs/toolkit';
import blogReducer from './reducers/blogReducer';
import notificationReducer from './reducers/notificationReducer';
import { useDispatch } from 'react-redux';
import userReducer from './reducers/userReducer';

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: userReducer
  },
});
export const AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => useDispatch();
export default store;
