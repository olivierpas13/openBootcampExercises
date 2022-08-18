import Notification from './components/Notification'
import AnecdoteForm from './components/AnecdoteForm'
import AnecdoteList from './components/AnecdoteList'
import Filter from './components/Filter'
import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
// import anecdotesService from './services/anecdotes'
import { initalizeAnecdotes } from './reducers/anecdoteReducer'


const App = () => {
  
  const dispatch = useDispatch()
  // useEffect(() => {
  //   anecdotesService
  //     .getAll().then(anecdotes => dispatch(setAnecdotes(anecdotes)))
  // }, [dispatch])

  useEffect(()=>{
    dispatch(initalizeAnecdotes())
  }, [dispatch])

  return (
    <div>
      <h2>Anecdotes</h2>
      <Filter/>
      <Notification/>
      <AnecdoteList/>
      <AnecdoteForm/>
    </div>
  )
}

export default App