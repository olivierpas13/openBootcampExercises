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
    },
    voteBlog(state, action){
      const id = action.payload;
      const blogVoted  = state.find(blog => blog.id === id);
      const blogObj = {
        ...blogVoted,
        likes: blogVoted.likes + 1
      };
      return state.map(blog => blog.id !== id? blog:blogObj);
    },
    eliminateBlog(state, action){
      const id = action.payload;
      return state.filter(blog => blog.id !== id);
    }
  }
});

export const initalizeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll();
    dispatch(setBlogs(blogs));
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

export const voteForBlog = (id) => {
  return async(dispatch) => {
    await blogService.updateBlog(id);
    dispatch(voteBlog(id));
  };
};

export const deleteOneBlog = (id) => {
  return async(dispatch) => {
    await blogService.deleteBlog(id);
    dispatch(eliminateBlog(id));
  };
};

export const { createBlog, setBlogs, voteBlog, eliminateBlog } = blogSlice.actions;

export default blogSlice.reducer;