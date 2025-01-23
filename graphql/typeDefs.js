const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    id: ID!         # Added 'id' field to match resolver expectations
    text: String!   # Changed 'test' to 'text' to align with your implementation
    createdAt: String!
    createdBy: String!
  }

  input MessageInput {
    text: String!
    username: String!
  }

  type Query {
    message(id: ID!): Message
  }

  type Mutation {
    createMessage(messageInput: MessageInput): Message!  # Corrected mutation name and type
  }
#   # Define what Mutations (create, update, delete) are allowed
#   type Mutation {
#     createMessage(
#       test: String!
#       createdBy: String!
#     ): Message
#   }

`;