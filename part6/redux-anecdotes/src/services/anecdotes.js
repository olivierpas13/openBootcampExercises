import axios from 'axios'

const baseUrl = 'http://localhost:3001/anecdotes'

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const createAnecdote = async (content) =>{
    const anecdoteObject = {
        content,
        votes: 0
    }

    const response = await axios.post(baseUrl, anecdoteObject)
    return response.data
}

const voteAnecdote = async(id) =>{
    
    const anecdotes = await getAll()

    const votedAnecdote = await anecdotes.find(anecdote => anecdote.id === id)

    const anecdoteObject = {
        ...votedAnecdote,
        votes: votedAnecdote.votes + 1
    }

    const response = await axios.put(`${baseUrl}/${id}`, anecdoteObject)
    
    return response.data
}

const anecdotesService = {
    getAll,
    createAnecdote,
    voteAnecdote
}

export default anecdotesService