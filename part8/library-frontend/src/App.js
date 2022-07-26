import { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import { useApolloClient, useSubscription } from '@apollo/client'
import Recommendation from './components/Recommendation'
import { ADDED_BOOK } from './subscriptions/subscriptions'
import {FIND_ALL_BOOKS} from './queries/queries'

const App = () => {
  const client = useApolloClient()

  useSubscription(ADDED_BOOK,{
    onSubscriptionData: ({subscriptionData}) =>{
      const {addedBook} = (subscriptionData.data)
      window.alert(`New book added, ${addedBook.title}`)
      const dataInStore = client.readQuery({
        query: FIND_ALL_BOOKS,
        variables: { genre: null}
      })
      client.writeQuery({
          query: FIND_ALL_BOOKS,
          variables:{
            genre: null
          },
          data:{
            ...dataInStore,
            allBooks:[
              ...dataInStore.allBooks,
              addedBook
            ]}
        })}
  })

  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)

  const handleLogout = (e) =>{
    e.preventDefault()

    setToken(null)
    localStorage.clear()
    client.resetStore()

  }

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
