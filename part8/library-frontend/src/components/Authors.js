import { useMutation, useQuery } from "@apollo/client"
import { EDIT_AUTHOR, FIND_ALL_AUTHORS } from "../queries/queries"
import { useField } from "../hooks/custom-hooks"

const Authors = (props) => {

  const {reset: resetName, ...name} = useField('text')
  const {reset: resetSetBornTo, ...setBornTo} = useField('number')

  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const {data, error} = useQuery(FIND_ALL_AUTHORS)
  if (!props.show) {
    return null
  }

  if(error){return <span>Error: {error}</span>}

  const authors = data?.allAuthors

  console.log(data)

const handleSubmit = (evt) =>{
  evt.preventDefault()

  if(error){return <span>Error: {error}</span>}

  editAuthor({variables: {
    name: name.value,
    setBornTo: Number(setBornTo.value)
  }})

  resetName()
  resetSetBornTo()

}


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
      <br/>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <label for='nameInput' >Author name</label>
        <input id="nameInput" {...name}/>
        <br/>
        <label for='bornInput' >Born</label>
        <input id='bornInput'{...setBornTo} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Authors
