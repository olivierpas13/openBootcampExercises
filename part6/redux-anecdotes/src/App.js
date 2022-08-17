import { useSelector, useDispatch } from 'react-redux'
import { AddAnecdoteForm } from './components/AddAnecdoteForm'
import { anecdoteVote, sortAnecdotes } from './reducers/anecdoteReducer'

const App = () => {
  const anecdotes = useSelector(state => (state))
  const dispatch = useDispatch()

  const vote = (id) => {
    dispatch(anecdoteVote(id))
    dispatch(sortAnecdotes())
  }
  
  return (
    <div>
      <h2>Anecdotes</h2>
      {
      anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => vote(anecdote.id)}>vote</button>
          </div>
        </div>
      )}
    <AddAnecdoteForm/>
    </div>
  )
}

export default App