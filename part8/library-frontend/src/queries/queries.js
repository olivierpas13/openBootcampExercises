import {gql} from '@apollo/client'

export const FIND_ALL_AUTHORS = gql`

query AllAuthors {
  allAuthors {
    name
    born
    bookcount
    id
  }
}

`