import { gql } from 'apollo-server-express'

export default gql`
  type User {
    id: ObjectID
    email: EmailAddress
    username: String
    pictureUrl: String
    status: String
    socketId: String
  }
`
