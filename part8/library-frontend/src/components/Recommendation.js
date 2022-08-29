import { useQuery } from "@apollo/client"
import { CURRENT_USER } from "../queries/queries"
import { FIND_ALL_BOOKS } from "../queries/queries"

const Recommendation = ({show}) =>{    
    const {data} = useQuery(CURRENT_USER)

    const user = data?.me

    const {data:booksData} = useQuery(FIND_ALL_BOOKS, {
      variables:{
      genre: user?.favouriteGenre 
    }})

    const books = booksData?.allBooks

    if (!show) {
        return null
      }
      
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
          books?.map((a) => (
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