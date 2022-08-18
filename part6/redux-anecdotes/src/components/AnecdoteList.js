import { useSelector, useDispatch } from "react-redux"
import { voteAnecdote, sortAnecdotes } from "../reducers/anecdoteReducer"
import { updateNotification } from "../reducers/notificationReducer"

const AnecdoteList = () => {
  const anecdotes = useSelector(state => (state.anecdotes))
  
  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteAnecdote(id))
    dispatch(sortAnecdotes())
    dispatch(updateNotification(content))
  }

    return(
        <div>
            {
            anecdotes.map(anecdote =>
              <div key={anecdote.id}>
                <div>
                  {anecdote.content}
                </div>
                <div>
                  has {anecdote.votes}
                  <button onClick={() => vote(anecdote.id, anecdote.content)}>vote</button>
                </div>
              </div>
            )}
        </div>
    )
}

export default AnecdoteList