import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import stripePromise from './stripe';

import { Navbar, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import MiamiLogo from './miamiStore.png'
function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      setCart([...cart, { ...product, quantity: 1 }]);
      setTotal(total + 1);
    } else {
      const updatedCart = [...cart];
      updatedCart[productIndex] = { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 };
      setCart(updatedCart);
      setTotal(total + 1);
    }
  };

  const removeProduct = (productId) => {
    const removedProductIndex = cart.findIndex((item) => item.id === productId.id);

    if (removedProductIndex !== -1) {
      const updatedRemovedCart = [...cart];
      if (updatedRemovedCart[removedProductIndex].quantity > 0) {
        updatedRemovedCart[removedProductIndex] = {
          ...updatedRemovedCart[removedProductIndex],
          quantity: updatedRemovedCart[removedProductIndex].quantity - 1,
        };
        setCart(updatedRemovedCart);
        setTotal(total - 1);
      }
    }
  };

  const removeAllProducts = () => {
    setCart([]);
    setTotal(0);
  };



  const handleCartClose = () => {
    setShowCart(false);
  };

  const handleCartOpen = () => {
    setShowCart(true);
  };

  return (
    <Container sm={1} fluid style={{ backgroundColor: 'rgba(203, 190, 181, 0.4)' }} className="App p-0 vw-100 vh-300 shadow my-1 mx-1">
      <Row style={{ backgroundColor: 'rgba(203, 190, 181, 0.1)' }} className="m-0 shadow my-1">
        <Col md={12} lg={6} className="p-0 vw-100">
          <Navbar sm={1} md={2} style={{ backgroundColor: 'rgba(203, 190, 181, 0.5)' }} className=" p-1 d-flex align-items-center justify-content-center rounded">
          <Col className="d-flex justify-content-flex-start flexwrap-wrap">
              <Row className=' rounded p-1 col-md-12'>
               <img className='col-sm-1 img-fluid' src={MiamiLogo} alt="Logo"></img>
                  <small><h2 className='fs-6 lh-sm font-monospace'>Shopping is exciting</h2></small>

              </Row>
            </Col>
            <Col align="center" className="p-0 rounded col-sm-1 mx-0">
              <Button style={{ backgroundColor: 'rgba(203, 190, 181, 0.5)' }} onClick={handleCartOpen} className='shadow text-dark'>
                Cart ({total})
              </Button>
              <Modal show={showCart} onHide={handleCartClose}>
                <Modal.Header closeButton>
                 <small> <Modal.Title className='font-monospace fs-1 lh-md'>Shopping Cart</Modal.Title></small>
                </Modal.Header>
                <Modal.Body>
                  <Elements stripe={stripePromise}>
                    <Cart cart={cart} stripePromise={stripePromise} total={total} />
                  </Elements>
                </Modal.Body>
              </Modal>
            </Col>
          </Navbar>
        </Col>
      </Row>
      <Row>
        <ProductList removeAllProducts={removeAllProducts} removeProducts={removeProduct} addToCart={addToCart} />
      </Row>
    </Container>
  );
}

export default App;
