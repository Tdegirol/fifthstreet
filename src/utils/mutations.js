import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const ADD_USER = gql`
  mutation addUser($username: String!, $email: String!, $password: String!) {
    addUser(username: $username, email: $email, password: $password) {
      token
      user {
        _id
        username
      }
    }
  }
`;

export const SAVE_PRODUCT = gql`
  mutation saveProduct(
    $name: String!
    $category: String!
    $description: String!
    $price: Int!
    $id: Int!
    $quantity: Int!
  ) {
    saveProduct(
      name: $name
      category: $category
      description: $description
      price: $price
      id: $id
      quantity: $quantity
    ) {
      _id
      username
      cartProducts {
        name
        category
        description
        price
        id
        quantity
      }
    }
  }
`;

export const REMOVE_PRODUCT = gql`
  mutation removeProduct($id: Int!) {
    removeProduct(
      id: $id
    ) {
      _id
      username
      cartProducts {
        name
        category
        description
        price
        id
        quantity
      }
    }
  }
`;

