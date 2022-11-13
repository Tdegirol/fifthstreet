import React, { useState, useEffect } from 'react';
import {
  Jumbotron,
  Container,
  CardColumns,
  Card,
  Modal,
  Button,
  Row,
  Col,
  Image,
  ListGroup,
  CloseButton,
} from "react-bootstrap";



const Home = () => {
    const [showModal, setShowModal] = useState(false);

    const [products] = useState([
      {
        name: 'Watermelon Tote Bag',
        category: 'bag',
        description: 'Watermelon handheld tote bag.',
        price: 15,
        id: 0
      },
      {
        name: 'Mountains Print',
        category: 'print',
        description: 'Mountain landscape in frame 12" x 16".',
        price: 20,
        id: 1
      },
      {
        name: 'Taco Money',
        category: 'bag',
        description: 'Zipper bag for your cash and cards.',
        price: 15,
        id: 2
      },
      {
        name: 'Monstera Print',
        category: 'print',
        description: 'Monstera & cats painting in frame 12" x 16".',
        price: 20,
        id: 3
      },
      {
        name: 'Shamrock Hat',
        category: 'hat',
        description: 'Hand stitched shamrock hat.',
        price: 25,
        id: 4
      },
      {
        name: 'Wine Bags',
        category: 'bag',
        description: 'Wine bags.',
        price: 15,
        id: 5
      },
      {
        name: 'Hot Sauce Bag',
        category: 'bag',
        description: 'Zipper bag for your hot sauce! or moneys or whatever.',
        price: 15,
        id: 6
      },
      {
        name: 'Fifth Street Beanie',
        category: 'hat',
        description: 'Wool beanie fifth street printing Co! One size fits all.',
        price: 25,
        id: 7
      }
    ]);
    const [currentProduct, setCurrentProduct] = useState(products[0]);
    
    const toggleModal = (products, i) => {
      setCurrentProduct({ ...products, index: i });
      setShowModal(!showModal);
    };

    return (
      <>
        <Container>
          <h1 id="home">Homepage</h1>
          <CardColumns>
            {products.map((product, i) => {
              return (
                <Card key={product.id} border="white">
                  <Card.Img
                    src={require(`../../assets/products/${product.id}.jpg`)}
                    alt={"Product Image Loading"}
                    variant="top"
                    className="cp"
                    onClick={() => {
                      setCurrentProduct(products[i])
                      toggleModal(product, i)
                    }}
                  />
                  <Card.Body>
                    <Card.Title>{product.name}</Card.Title>
                    <Card.Text>
                      {`$${product.price}`}
                      {<br />}
                      {product.description}
                    </Card.Text>
                    <Button
                      className="btn-block btn- border-dark"
                      variant="light"
                      onClick={() => {
                        setCurrentProduct(products[i])
                        toggleModal(product, i)
                      }}
                    >
                      Add to cart
                    </Button>
                  </Card.Body>
              </Card>
              )
            })}
          </CardColumns>
        </Container>
        <Modal
          size='xl'
          show={showModal}
          onHide={() => setShowModal(false)}
        >
          <Modal.Header closeButton/>
          <Image
            src={require(`../../assets/products/${currentProduct.id}.jpg`)}
            alt={`Image for ${currentProduct.name}`}
            fluid
          />
        </Modal>
      </>
    );
  };
  
export default Home;