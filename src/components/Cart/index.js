import React, { useState } from 'react';
import { Jumbotron, Container, CardColumns, Card, Modal, Button, Row, Col, Image, ListGroup } from 'react-bootstrap';
import { GET_ME } from "../../utils/queries"
import { REMOVE_PRODUCT } from '../../utils/mutations';
import Auth from '../../utils/auth';
import { useQuery, useMutation } from "@apollo/client";

const Cart = () => {
    const { loading, data } = useQuery(GET_ME);
    let userData = data?.me || {};
    const [removeProduct] = useMutation(REMOVE_PRODUCT);
    console.log(userData);
    const [product, setProduct] = useState({});
    const [showModal, setShowModal] = useState(false);

    if (loading) {
        return (<h2>LOADING...</h2>);
    };

    const handleDeleteProducts = async (id) => {
        // get token
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
          return false;
        }
    
        try {
          console.log(id);
          await removeProduct({
            variables: {
              id: id,
            },
          });
        } catch (err) {
          console.error(err);
        }
      };
    
      return (
        <>
            <Container>
            {/* <h2>
                {userData.cartProducts.length
                ? `${userData.cartProducts.length} ${userData.cartProducts.length === 1 ? 'product' : 'productss'} in cart.`
                : 'Your cart is empty.'}
            </h2> */}
            <h3>
                cart page ...
            </h3>
            </Container>
        </>
      )





  };
  
export default Cart;