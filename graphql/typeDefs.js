const { gql } = require('apollo-server');

module.exports = gql`
  type Message {
    test: String
    createdAt: String
    createdBy: String
}

  input MessageInput {
    text: String
    username: String
}
    
  type Query {
    message(id: ID!): Message
}

  type Mutation {
    createdMessage(messageInput: Message): Message!
}
#   # Define what Mutations (create, update, delete) are allowed
#   type Mutation {
#     createMessage(
#       test: String!
#       createdBy: String!
#     ): Message
#   }
`;