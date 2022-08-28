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
query AllBooks($genre: String) {
  allBooks(genre: $genre) {
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
  bookCount
  authorCount
  allAuthors {
    name
    id
    born
    bookcount
  }
  me {
    username
    favouriteGenre
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
// export const FIND_ALL_BOOKS_BY_GENRE = gql`
// `
