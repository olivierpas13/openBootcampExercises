import { useSelector, useDispatch } from 'react-redux'
import { AddAnecdoteForm } from './components/AddAnecdoteForm'

const App = () => {
  const anecdotes = useSelector(state => (state))
  const dispatch = useDispatch()

  
//   const orderAnecdotes = () =>{
//     return anecdotes.sort((a, b)=>{return b-a})
// }

  const vote = (id) => {
    // orderAnecdotes()

    dispatch({
      type: '@anecdotes/voted',
      payload: {id}
    })

    dispatch({
      type: '@anecdotes/sorted'
    })

  }
  
  console.log(anecdotes)
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