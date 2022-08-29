require('dotenv').config()

const { ApolloServer } = require('apollo-server-express')
const { execute, subscribe } = require('graphql')
const { SubscriptionServer } = require('subscriptions-transport-ws')
const { ApolloServerPluginDrainHttpServer,
  ApolloServerPluginLandingPageLocalDefault } = require('apollo-server-core')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const {createServer} = require('http')
const jwt = require('jsonwebtoken')
const db = require('./db')
const JWT_SECRET = process.env.SECRET

const User = require ('./models/user')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')

/*
 * Suomi:
 * Saattaisi olla järkevämpää assosioida kirja ja sen tekijä tallettamalla kirjan yhteyteen tekijän nimen sijaan tekijän id
 * Yksinkertaisuuden vuoksi tallennamme kuitenkin kirjan yhteyteen tekijän nimen
 *
 * English:
 * It might make more sense to associate a book with its author by storing the author's id in the context of the book instead of the author's name
 * However, for simplicity, we will store the author's name in connection with the book
*/

const startApolloServer = async() => {


const schema = makeExecutableSchema({typeDefs, resolvers})

const app = express()

const httpServer = createServer(app)

const subscriptionServer = SubscriptionServer.create(
  {
    schema,
    execute,
    subscribe
  },
  {
    server: httpServer,
    path: '',
  }
)
  
const server = new ApolloServer({
  schema,
  context: async({req})=>{
    const auth = req? req.headers.authorization : null

    if(auth && auth.toLowerCase().startsWith('bearer ')){
      const {id} = jwt.verify(
        auth.substring(7), JWT_SECRET
      )

      const currentUser = await User.findById(id)
      return {currentUser}
    }
  },  
  plugins: [
    ApolloServerPluginDrainHttpServer({ httpServer }),
    {
      async serverWillStart() {
        return {
          async drainServer() {
            subscriptionServer.close()
          },
        };
      },
    },
    ApolloServerPluginLandingPageLocalDefault({ embed: true }),
  ],
});
await server.start()
server.applyMiddleware({
  app,
  path: '/',
})
const PORT = process.env.PORT
httpServer.listen(PORT, () => console.log(`Server running on PORT ${PORT}`))
}

startApolloServer()