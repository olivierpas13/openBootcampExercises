import {gql} from '@apollo/client'

export const ADDED_BOOK = gql`

subscription AddedBook {
  addedBook {
    title
    published
    author {
      bookcount
      born
      id
      name
    }
    genres
    id
  }
}

`