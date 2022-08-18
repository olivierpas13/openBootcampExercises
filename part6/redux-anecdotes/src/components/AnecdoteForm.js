import { useDispatch } from "react-redux"
import { createAnecdote } from "../reducers/anecdoteReducer"
import { createdNotification } from "../reducers/notificationReducer"
import anecdotesService from "../services/anecdotes"

const AnecdoteForm = () =>{
    const dispatch = useDispatch()


    const addAnecdote = (event) =>{
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = '';
        dispatch(createAnecdote(anecdote))
        dispatch(createdNotification(anecdote))
        anecdotesService.createAnecdote(anecdote)
    }
    return(
    <div>
        <h2>create new</h2>
            <form onSubmit={(event) => addAnecdote(event)}>
                <input type="text" name="anecdote"/>
                <button type="submit">create</button>
            </form>
    </div>
    )
}

export default AnecdoteForm