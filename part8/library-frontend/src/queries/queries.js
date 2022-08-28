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

export const FIND_ALL_BOOKS = gql`

query AllBooks {
  allBooks {
    title
    published
    author {
      name
      id
      born
      bookcount
    }
    genres
    id
  }
}

`

export const CURRENT_USER = gql`

query Me {
  me {
    username
    favouriteGenre
    id
  }
}

`

