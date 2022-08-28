import { useMutation } from '@apollo/client'
import { useState } from 'react'
import { CREATE_BOOK } from '../mutations/mutations'

const NewBook = (props) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [published, setPublished] = useState('')
  const [genre, setGenre] = useState('')
  const [genres, setGenres] = useState([])

  const [ createBook ] = useMutation(CREATE_BOOK,{
    onError: (error) => {
      console.log(error)  
      return window.alert('Invalid input')
      },
    })  

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
