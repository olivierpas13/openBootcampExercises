import { useDispatch } from "react-redux"
import { createNewAnecdote } from "../reducers/anecdoteReducer"
import { createdNotification } from "../reducers/notificationReducer"

const AnecdoteForm = () =>{
    const dispatch = useDispatch()


    const addAnecdote = async (event) =>{
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = '';
        dispatch(createNewAnecdote(anecdote))
        dispatch(createdNotification(anecdote))
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