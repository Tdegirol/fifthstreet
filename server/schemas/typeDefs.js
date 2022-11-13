// import the gql tagged template function
const { gql } = require("apollo-server-express");

// create our typeDefs
const typeDefs = gql`
  type Product {
    name: String!
    category: String
    description: String
    price: Int
    id: Int
    quantity: Int
  }

  type Products {
    products: [Product]
    isMore: Boolean
  }

  type User {
    _id: ID
    username: String
    email: String
    password: String
    cartProducts: [Product]
    cartProductIds: [Int]
  }

  type Auth {
    token: ID!
    user: User
  }

  type Query {
    me: User
    getSingleUser(username: String!): User
    getUser: [User]
  }

  type Mutation {
    login(email: String!, password: String!): Auth
    addUser(username: String!, email: String!, password: String!): Auth
    saveProduct(
      name: String!
      category: String
      description: String
      price: Int
      id: Int
      quantity: Int
      ): User
    removeProduct(id: Int!): User
  }
`;

module.exports = typeDefs;
