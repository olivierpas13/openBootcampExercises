import { useQuery } from "@apollo/client"
import { FIND_ALL_BOOKS } from "../queries/queries"
import {useState} from 'react'

import GenderFilter from "./GenderFilter"

const Books = (props) => {
  const [filter, setFilter] = useState(null)
  const {data, error, loading} = useQuery(FIND_ALL_BOOKS, {
    variables:{
    genre: filter
  }})

  if (!props.show) {
    return null
  }

  if(error){return <span>Error: {error}</span>}

  const books=data?.allBooks

  let booksToShow = books

  // if(filter !== 'ALL'){

    // const {data, error, loading} = useQuery(FIND_ALL_BOOKS())


    // if(!loading){
    //   booksToShow = data
    // }

    // booksToShow = (books
    //   .filter(book=> book.genres
    //     .map(genre=> genre.toUpperCase().replace(/ /g, ""))
    //     .includes(filter)))
  // }

  console.log(booksToShow)

  return (
    <div>
      <h2>books</h2>
      In genre {filter}
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {
          booksToShow?.map((a) => (
            <tr key={a.id}>
              <td>{a.title}</td>
              <td>{a.author.name}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
      {
        !loading
        ? <GenderFilter books={books} setFilter= {setFilter}/>
        : null
      }
    </div>
  )
}

export default Books
