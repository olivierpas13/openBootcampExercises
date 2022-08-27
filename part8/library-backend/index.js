require('dotenv').config()
const jwt = require('jsonwebtoken')

const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const Author = require ('./models/author')
const Book = require ('./models/book')
const User = require ('./models/user')

const db = require('./db')

const JWT_SECRET = process.env.SECRET

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/


const typeDefs = gql`

  type User {
    username: String!
    favouriteGenre: String!
    id: ID!
  }

  type Token{
    value: String!
  }

  type Book {
  title: String!
  published: Int!
  author: Author!
  genres: [String!]!
  id: ID!
  }

  type Author{
    name: String!,
    id: ID!
    born: Int
    bookcount: Int
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String,
    genre: String): [Book]
    allAuthors: [Author]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: String!
      genres: [String]!
    ): Book

    editAuthor(
      name: String!
      setBornTo: Int!
    ):Author

    createUser(
      username: String!
      favouriteGenre: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token
  }

`

const resolvers = {
  Query: {
    bookCount: async () =>{
      return await Book.collection.countDocuments();
    },
    authorCount: async () => {
      return await Author.collection.countDocuments();
    },
    allBooks: async (root, args) => {
      // if(args.author && args.genre){return books.filter(book => book.genres.includes(args.genre) && book.author === args.author)}
      // if(args.author){return books.filter(book=> book.author === args.author)}
      // if(args.genre){return books.filter(book=> book.genres.includes(args.genre))}
      return Book.find({}).populate('author')
    },
    allAuthors: async () =>{
      return Author.find({});
    },
    me: async (root, args, context) =>{
      return context.currentUser
    }
  },
  Mutation:{
    addBook: async (root, args, context)=> {

      const {currentUser} = context

      if(!currentUser){throw new AuthenticationError("Not authenticated")}

      let author = await Author.findOne({name: args.author})
      
      if(!author){
      const newAuthor = new Author({name: args.author}) 
      const authorSaved = await newAuthor.save()
      author = authorSaved
      }
      
      const book = new Book ({
        ...args,
        author: author._id
      })

      try {
        return await (await book.save()).populate('author')
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },
    editAuthor: async (root, args, context) => {
    
      const {currentUser} = context

      if(!currentUser){throw new AuthenticationError("Not authenticated")}

      const {name, setBornTo} = args

      const author = await Author.findOne({name})
      author.born = setBornTo  
      try {
        
        return author.save()
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }

       }, 

    createUser: async(root, args) =>{
      const user = new User({
        username: args.username,
        favouriteGenre: args.favouriteGenre
      })


    
      try {
        const saved = await user.save()
        return saved
      } catch (error) {
        throw new UserInputError(error.message, {
          invalidArgs: args
        })
      }
    },

    login: async(root, args) => {
      
      const user = await User.findOne({ username: args.username })
      
      if( !user || args.password !== 'supersecret' ){
        throw new UserInputError("Wrong credentials")
      }

      const userForToken = {
        username: user.username,
        id: user._id,
      }
    
      return {value: jwt.sign(userForToken, JWT_SECRET)}

    }
  },
  Author: {
    bookcount: async (root) => {
      const books = await Book.find({}).populate('author')
      return books.filter(book=> book.author.name === root.name).length
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async({req})=>{
    const auth = req? req.headers.authorization : null

    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const {id} = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(id)
      return {currentUser}
    }

  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})