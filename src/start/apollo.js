import { ApolloServer } from 'apollo-server-express'
import { buildFederatedSchema } from '@apollo/federation'

import { typeDefs, resolvers } from '@graphql'

/**
 * @description apollo Server loader
 * @memberof module:Loader
 */
const apolloLoader = async () => {
  const schema = buildFederatedSchema([
    {
      typeDefs,
      resolvers
    }
  ])
  const apolloServer = new ApolloServer({
    schema,
    playground: {
      endpoint: '/graphql',
      settings: {
        'editor.theme': 'light'
      }
    },
    mocks: false,
    mockEntireSchema: false
  })

  return apolloServer
}

export default apolloLoader
