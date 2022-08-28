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

export const CREATE_BOOK = gql`

mutation AddBook($title: String!, $published: Int!, $author: String!, $genres: [String]!) {
  addBook(title: $title, published: $published, author: $author, genres: $genres) {
    title
    published
    author
    id
    genres
  }
}

`

export const EDIT_AUTHOR = gql`
mutation EditAuthor($name: String!, $setBornTo: Int!) {
  editAuthor(name: $name, setBornTo: $setBornTo) {
    name
    id
    born
    bookcount
  }
}
`

export const LOGIN = gql`

mutation Login($username: String!, $password: String!) {
  login(username: $username, password: $password) {
    value
  }
}

`