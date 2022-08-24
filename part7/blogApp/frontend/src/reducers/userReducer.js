import { createSlice } from '@reduxjs/toolkit';
import userService from '../services/users';

const userSlice = createSlice({
  name: 'user',
  initialState: {
    loggedUser: null,
    users: []
  },
  reducers:{
    login(state, action){
      const user = action.payload;
      return{
        ...state,
        loggedUser: user
      };
    },
    setUsers(state, action){
      return{
        ...state,
        users: action.payload
      };

    }
  }
});

export const getAllUsers = () => {
  return async (dispatch) => {
    try {
      const users = await userService.getAll();
      dispatch(setUsers(users));
    } catch (error) {
      return error;
    }
  };
};

export const { login, setUsers } = userSlice.actions;

export default userSlice.reducer;