// import { useDispatch } from "react-redux"
import {createNewAnecdote} from '../reducers/anecdoteReducer'
import { connect } from "react-redux"
import { setNotification } from "../reducers/notificationReducer"

const AnecdoteForm = (props) =>{
    // const dispatch = useDispatch()


    const addAnecdote = async (event) =>{
        event.preventDefault();
        const anecdote = event.target.anecdote.value
        event.target.anecdote.value = '';

        props.createNewAnecdote(anecdote)
        props.setNotification(`New anecdote ${anecdote}`, 5)
        
        // dispatch(createNewAnecdote(anecdote))
        // dispatch(setNotification(`New anecdote ${anecdote}`, 5))
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

// export default AnecdoteForm

const mapDispatchToProps = {
    setNotification,
    createNewAnecdote,
  }

export default connect(
    null,
    mapDispatchToProps
  )(AnecdoteForm)