import { createSlice } from '@reduxjs/toolkit';
import blogService from '../services/blogs';

const blogSlice = createSlice({
  name: 'blog',
  initialState: [],
  reducers:{
    createBlog(state, action){
      const anecdote = action.payload;
      const newAnecdote = anecdote;
      state.push(newAnecdote);
    },
    setBlogs(state, action){
      return action.payload;
    }
  }
});

export const initalizeBlogs = () => {
  return async (dispatch) => {
    const anecdotes = await blogService.getAll();
    dispatch(setBlogs(anecdotes));
  };
};

export const createNewBlog = (content) => {
  return async(dispatch) => {
    try {
      const newAnecdote = await blogService.postBlog(content);

      if((newAnecdote.message === 'Request failed with status code 400')){throw new Error;}
      dispatch(createBlog(newAnecdote));

    } catch (error) {
      console.log('error en redycer');
      throw (error);
    }
  };
};

export const { createBlog, setBlogs } = blogSlice.actions;

export default blogSlice.reducer;