import { useDispatch } from 'react-redux';
import { useCallback } from 'react';
import { unwrapResult } from '@reduxjs/toolkit';

export const useUnwrapAsyncThunk = () => {
  const dispatch = useDispatch();
  return useCallback((asyncThunk) => {
    return dispatch(asyncThunk).then(unwrapResult);
  }), [dispatch];
};