import { useQuery } from "@apollo/client"
import { FIND_ALL_AUTHORS } from "../queries/queries"

const Authors = (props) => {
  const {data, error} = useQuery(FIND_ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if(error){return <span>Error: {error}</span>}

  const authors = data?.allAuthors

  console.log(data)


  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.name}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default Authors
