import { useQuery } from "@apollo/client"
import { CURRENT_USER } from "../queries/queries"
import { useApolloClient } from "@apollo/client"
import { FIND_ALL_BOOKS } from "../queries/queries"

const Recommendation = ({show}) =>{
    const client = useApolloClient()
    
    const {data} = useQuery(CURRENT_USER)

    const user = data?.me

    const books = client.readQuery({
        query: FIND_ALL_BOOKS,
    })

    if (!show) {
        return null
      }
      
      const booksToShow = books?.allBooks?.filter(book=> book.genres
        .map(genre=> genre.toUpperCase().replace(/ /g, ""))
        .includes(user.favouriteGenre.toUpperCase()))

    return(
        <div>
            <h2>
                Recommendations
            </h2>
            <p>
                Books in your favourite genre <strong>{user.favouriteGenre}</strong>
            </p>
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
        </div>

    )
}

export default Recommendation