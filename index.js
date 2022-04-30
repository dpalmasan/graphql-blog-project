import { ApolloServer } from "apollo-server"


const typeDefs = `
  type Photo {
    id: ID!
    url: String!
    name: String!
    description: String
  }


  type Query {
    totalPhotos: Int!
    allPhotos: [Photo!]!
  }

  type Mutation {
    postPhoto(name: String! description: String): Photo!
  }
`

var _id = 0
var photos = []

const resolvers = {
  Query: {
    totalPhotos: () => photos.length,
    allPhotos: () => photos
  },

  Mutation: {

    // Parent is always the first argument to a resolver
    postPhoto(parent, args) {

      let newPhoto = {
        id: _id++,
        ...args
      }
      photos.push(newPhoto);
      return newPhoto;
    }
  },

  Photo: {

    // parent represent current photo object
    url: parent => `https://yoursite.com/img/${parent.id}.jpg`
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server
  .listen({ port: 4002 })
  .then(({ url }) => console.log(`GraphQL service is running on ${url}`));