import { gql } from "@apollo/client";

export const GET_ME = gql`
  {
    me {
      _id
      username
      email
      cartProducts {
        name
        category
        description
        price
        id
        quantity
      }
      cartProductIds
    }
  }
`;
