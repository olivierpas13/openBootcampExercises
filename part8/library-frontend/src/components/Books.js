import { useQuery } from "@apollo/client"
import { FIND_ALL_BOOKS } from "../queries/queries"

const Books = (props) => {
  const {data, error} = useQuery(FIND_ALL_BOOKS)

  if (!props.show) {
    return null
  }

  if(error){return <span>Error: {error}</span>}

  const books = data?.allBooks

  console.log(data)

  return (
    <div>
      <h2>books</h2>

      <table>
        <tbody>
          <tr>
            <th></th>
            <th>author</th>
            <th>published</th>
          </tr>
          {books?.map((a) => (
            <tr key={a.title}>
              <td>{a.title}</td>
              <td>{a.author}</td>
              <td>{a.published}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Books
