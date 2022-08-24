import { createSlice } from '@reduxjs/toolkit';

const userSlice = createSlice({
  name: 'user',
  initialState: null,
  reducers:{
    login(state, action){
      const user = action.payload;
      return user;
    }
  }
});
export const { login } = userSlice.actions;

export default userSlice.reducer;