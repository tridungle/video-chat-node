import { mergeResolvers } from '@graphql-tools/merge'
import { resolvers as customScalarResolves } from 'graphql-scalars'

const rootResolver = {
  Query: {}
}

export default mergeResolvers([customScalarResolves, rootResolver])
