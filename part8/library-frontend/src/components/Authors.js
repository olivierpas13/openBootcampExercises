import { useMutation, useQuery } from "@apollo/client"
import { FIND_ALL_AUTHORS } from "../queries/queries"
import { EDIT_AUTHOR } from "../mutations/mutations"
import { useField } from "../hooks/custom-hooks"
import Select from 'react-select'
import { useState } from "react"



const Authors = (props) => {

  const {data, error} = useQuery(FIND_ALL_AUTHORS)
  const {reset: resetSetBornTo, ...setBornTo} = useField('number')
  const [editAuthor] = useMutation(EDIT_AUTHOR)

  const [selectedOption, setSelectedOption] = useState(null)

  if (!props.show) {
    return null
  }

  if(error){return <span>Error: {error}</span>}

  const authors = data?.allAuthors


  const nameOptions = authors?.map(author =>({
    value: author.name,
    label: author.name
  }))


const handleSubmit = (evt) =>{
  evt.preventDefault()

  if(error){return <span>Error: {error}</span>}

  editAuthor({variables: {
    name: selectedOption.value,
    setBornTo: Number(setBornTo.value)
  }})
  resetSetBornTo()
  // console.log(selectedOption.value)

}


  return (
    <div>
      <h1>authors</h1>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>born</th>
            <th>books</th>
          </tr>
          {authors?.map((a) => (
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookcount}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <br/>
      <form onSubmit={(e)=> handleSubmit(e)}>
        <legend><h2> Set birthyear</h2></legend>
        <Select
        defaultValue={selectedOption}
        onChange={setSelectedOption}
        options={nameOptions}
        />
        <br/>
        <label >Born</label>
        <input id='bornInput'{...setBornTo} />
        <button>Submit</button>
      </form>
    </div>
  )
}

export default Authors
