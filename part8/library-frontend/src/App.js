import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient } from '@apollo/client'
import Recommendation from './components/Recommendation'


const App = () => {
  const client = useApolloClient()
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const handleLogout = (e) =>{
    e.preventDefault()

    setToken(null)
    localStorage.clear()
    client.resetStore()

  }

  console.log(token)

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        {
          token?
          <>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommendation')}>recommend</button>
        <button onClick={(e)=> handleLogout(e)} >Logout</button>
          </>
          :
        <button onClick={() => setPage('login')}>login</button>
        }
      </div>

      <Authors show={page === 'authors'} />

      <Books show={page === 'books'} />

      <NewBook show={page === 'add'} />

      <LoginForm show={page === 'login'} setToken={setToken} />

      <Recommendation show={page === 'recommendation'} setToken={setToken} />

    </div>
  )
}

export default App
