import { useSelector, useDispatch } from "react-redux"
import { sortAnecdotes } from "../reducers/anecdoteReducer"
import { setNotification } from "../reducers/notificationReducer"
import { voteForAnecdote } from "../reducers/anecdoteReducer"


const AnecdoteList = () => {
  const anecdotes = useSelector(state => (state.anecdotes))
  const filter = useSelector(state=> state.filter)

  const anecdotesToShow = (filter.length === 0) ? anecdotes :
  anecdotes.filter(anecdote => anecdote.content.toLowerCase().includes(filter.toLowerCase()))


  const dispatch = useDispatch()

  const vote = (id, content) => {
    dispatch(voteForAnecdote(id))
    dispatch(sortAnecdotes())
    dispatch(setNotification(`You voted ${content}`, 5))
  }

    return(
        <div>
            {
            anecdotesToShow.map(anecdote =>
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