import React, { useState, useEffect } from 'react';
import { useQuery, useMutation, useApolloClient } from "@apollo/client";
import { SAVE_PRODUCT } from "../../utils/mutations";
import { GET_ME } from "../../utils/queries";
import {
  Jumbotron,
  Container,
  CardColumns,
  Row,
  Col,
  Card,
  Modal,
  Button,
  Image,
  Dropdown,
} from "react-bootstrap";
import productsArr from "../../utils/products.js";
import sortProducts from "../../utils/helpers.js"

const Home = () => {
  const { loading, data } = useQuery(GET_ME);
  let userData = data?.me || {};
  const user = data?.me;
  const [saveProduct] = useMutation(SAVE_PRODUCT);
  const [showModal, setShowModal] = useState(false);
  const [cartProductIds, setCartProductIds] = useState([]);
  const [sortOption, setSortOption] = useState('');

  const handleSort = (e) => {
    setSortOption(e);
  }

  if (cartProductIds.length < user?.cartProductIds.length) {
    setCartProductIds(user.cartProductIds)
  }

  const [products] = useState(productsArr);
  const [currentProduct, setCurrentProduct] = useState(products[0]);

  const handleAddToCart = async (id) => {
    const productToAdd = products.find((product) => product.id === id);

    try {
      await saveProduct({
        variables: {...productToAdd },
      })
      setCartProductIds([
        ...cartProductIds, productToAdd.id
      ])
    } catch (err) {
      console.error(err);
    }
  };
  
  const toggleModal = (products, i) => {
    setCurrentProduct({ ...products, index: i });
    setShowModal(!showModal);
  };

  // useEffect(() => {
  //   sortProducts(sortOption);
  //   console.log(sortOption);
  // }, [sortOption])
  
    return (
      <>
        <Container>
          <h1>Welcome to Fifth Street</h1>
          <div>
            <Dropdown>
              <Dropdown.Toggle
                variant="light"
              >
                Sort Products:
              </Dropdown.Toggle>
                <p>{sortOption}</p>
              <Dropdown.Menu>
                <Dropdown.Item eventKey="Name" onSelect={handleSort}>Name</Dropdown.Item>
                <Dropdown.Item eventKey="Price Low to High" onSelect={handleSort}>Price Low to High</Dropdown.Item>
                <Dropdown.Item eventKey="Price High to Low" onSelect={handleSort}>Price High to Low</Dropdown.Item>
              </Dropdown.Menu>

            </Dropdown>
          </div>

          <Row xl={3}>
            {sortProducts(sortOption)}
            {products.map((product, i) => {
              return (   
              <Col xl={{order:i}}>
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
                      onClick={() => handleAddToCart(product.id)}
                    >
                      Add to cart
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
              )
            })}
          </Row>
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