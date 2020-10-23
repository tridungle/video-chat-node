import { gql } from 'apollo-server-express'
import { mergeTypeDefs } from '@graphql-tools/merge'
import UserTypeDef from '@components/users/users.typedef'
const root = gql`
  scalar EmailAddress
  scalar ObjectID
  scalar DateTime
`
export default mergeTypeDefs([root, UserTypeDef])
