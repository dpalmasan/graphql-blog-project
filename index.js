import { ApolloServer } from "apollo-server"


const typeDefs = `
  type Query {
    totalPhotos: Int!
  }
`

const resolvers = {
  Query: {
    totalPhotos: () => 42
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen({ port: 4002 })
  .then(({ url }) => console.log(`GraphQL service is running on ${url}`));