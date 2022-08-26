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
    author
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