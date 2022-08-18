import { createSlice } from "@reduxjs/toolkit"
import anecdotesService from "../services/anecdotes"

const anecdoteSlice = createSlice({
  name: 'anecdotes',
  initialState: [],
  reducers:{
    voteAnecdote(state, action){
      const id = action.payload
      const blogVoted = state.find(blog=> blog.id === id)  
      const blogUpdated = { 
        ...blogVoted, 
        votes: blogVoted.votes + 1
      }
      return state.map(blog =>
        blog.id !== id ? blog : blogUpdated 
      )
    },

    createAnecdote(state, action){
      const anecdote = action.payload
      const newAnecdote = anecdote
      state.push(newAnecdote)
    },

    sortAnecdotes(state, action){
      const sortedList = state.sort((a , b)=>{return b.votes-a.votes})
      return sortedList 
    },
  
    setAnecdotes(state, action){
      return action.payload
    }
  }
})

export const initalizeAnecdotes = () =>{
  return async (dispatch) =>{
    const anecdotes = await anecdotesService.getAll()
    dispatch(setAnecdotes(anecdotes))
  }
}

// export const createNewAnecdote = () =>{
//   return async(dispatch) =
// }


export const {voteAnecdote, createAnecdote, sortAnecdotes, setAnecdotes} = anecdoteSlice.actions

export default anecdoteSlice.reducer