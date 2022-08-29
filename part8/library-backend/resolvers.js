require('dotenv').config()

const { UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')
const Author = require ('./models/author')
const Book = require ('./models/book')
const User = require ('./models/user')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const JWT_SECRET = process.env.SECRET

const SUBSCRIPTION_EVENTS = {
    ADDED_BOOK: 'ADDED_BOOK'
  }

const resolvers = {
    Query: {
      bookCount: async () =>{
        return await Book.collection.countDocuments();
      },
      authorCount: async () => {
        return await Author.collection.countDocuments();
      },
      allBooks: async (root, args) => {
        if(args.genre){
          return Book.find({
            genres: {$in: [args.genre]}
          }).populate('author').collation( { locale: 'en', strength: 2 } )
        }
        return Book.find({}).populate('author')
      },
      allAuthors: async () =>{
       const authors = await Author.find({});
        return authors
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
        
        if(author){
          author.bookCount += 1;
          author.save()
        }
        
        if(!author){
        const newAuthor = new Author({name: args.author, bookCount: 1}) 
        const authorSaved = await newAuthor.save()
        author = authorSaved
        }
        
        const book = new Book ({
          ...args,
          author: author._id
        })

  
        try {
          await (await book.save()).populate('author')
        } catch (error) {
          throw new UserInputError(error.message, {
            invalidArgs: args
          })
        }

        pubsub.publish(SUBSCRIPTION_EVENTS.ADDED_BOOK, { addedBook: book })
        return book
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
    Subscription:{
      addedBook: {
        subscribe: () => pubsub.asyncIterator(SUBSCRIPTION_EVENTS.ADDED_BOOK)
      }
    }
  }

module.exports = resolvers

  