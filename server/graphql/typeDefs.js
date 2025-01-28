import { gql } from 'apollo-server';

export default gql`
  # User Type Definition
  type User {
    id: ID!
    username: String!
    email: String!
    token: String!
  }

  # Message Type Definition
  type Message {
    id: ID!
    text: String!
    createdBy: String!
    createdAt: String!
  }

  # Input Types for User Registration and Login
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

  # Input Type for Creating Messages
  input MessageInput {
    text: String!
    createdBy: String!
  }

  # Query Type Definitions
  type Query {
    message(id: ID!): Message
    user(id: ID!): User
  }

  # Mutation Type Definitions
  type Mutation {
    registerUser(registerInput: RegisterInput): User
    loginUser(loginInput: LoginInput): User
    createMessage(messageInput: MessageInput): Message
  }
`;
















