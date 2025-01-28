const { gql } = require('apollo-server');

module.exports = gql`
 type User {
    id: ID!
    username: String!
    email: String!
    password: String!
    token: String!
  }

  type Message {
    id: ID!
    text: String!
    createdBy: String!
    createdAt: String!
  }

  input RegisterInput {
    username: String!
    email: String!
    password: String!
    confirmPassword: String!
  }

  input LoginInput {
    email: String!
    password: String!
  }

  input MessageInput {
    text: String!
    username: String!
  }

  type Query {
    message(id: ID!): Message
    user(id: ID!): User
  }

  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createMessage(messageInput: MessageInput): Message
  }
`;
