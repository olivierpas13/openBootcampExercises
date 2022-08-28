import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { FIND_ALL_BOOKS } from '../queries/queries'
import { CREATE_BOOK } from '../mutations/mutations'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  // refetchQueries: [
  //   {query: FIND_ALL_BOOKS},
  //   {query: FIND_ALL_AUTHORS}],
  const [ createBook ] = useMutation(CREATE_BOOK,{
    onError: (error) => {
      console.log(error)  
      return window.alert('Invalid input')
      },
    update:async (store, response) => {
      const dataInStore = await store.readQuery({
        query: FIND_ALL_BOOKS,
        variables: {
          genre: null,
        },
      })
      console.log(dataInStore)
        store.writeQuery({
          query: FIND_ALL_BOOKS,
          variables:{
            genre: null
          },
          data:{
            ...dataInStore,
            allBooks:[
              ...dataInStore.allBooks,
              response.data.addBook
            ]
          }
        })
      }
    })  
      // update: (cache, response) => {
      //   cache.updateQuery({ query: FIND_ALL_BOOKS }, ({ allBooks }) => {
      //     return {
      //       allBooks: allBooks.concat(response.data.addPerson),
      //     }
      //   })
      // },

  if (!props.show) {
    return null
  }
  
    const submit = async (event) => {
    event.preventDefault()
      
    const publishedDate = Number(published? published: null)

    createBook({variables: {
      title: title.length > 0 ? title: null,
      author: author.length > 0 ? author: null,
      published: publishedDate,
      genres: genres.length > 0 ? genres: null
    }})

    setTitle('')
    setPublished('')
    setAuthor('')
    setGenres([])
    setGenre('')
  }

  const addGenre = () => {
    setGenres(genres.concat(genre))
    setGenre('')
  }

  return (
    <div>
      <form onSubmit={submit}>
        <div>
          title
          <input
            value={title}
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author
          <input
            value={author}
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          published
          <input
            value={published}
            onChange={({ target }) => setPublished((target.value))}
          />
        </div>
        <div>
          <input
            type="text"
            value={genre}
            onChange={({ target }) => setGenre(target.value)}
          />
          <button onClick={addGenre} type="button">
            add genre
          </button>
        </div>
        <div>genres: {genres.join(' ')}</div>
        <button type="submit">create book</button>
      </form>
    </div>
  )
}

export default NewBook
