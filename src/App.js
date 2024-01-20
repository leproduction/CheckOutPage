import React, { useState } from 'react';
import { Elements } from '@stripe/react-stripe-js';
import ProductList from './components/ProductList';
import Cart from './components/Cart';
import Checkout from './components/Checkout';
import stripePromise from './stripe';
import { Navbar, Container, Row, Col, Modal, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';


function App() {
  const [showCart, setShowCart] = useState(false);
  const [cart, setCart] = useState([]);
  const [total, setTotal] = useState(0);

  const addToCart = (product) => {
    // Check if the product is already in the cart based on its id
    const productIndex = cart.findIndex((item) => item.id === product.id);

    if (productIndex === -1) {
      // If the product is not in the cart, add it to the cart and update the total
      setCart([...cart, { ...product, quantity: 1 }]);
      setTotal(total + 1);
    } else {
      // If the product is already in the cart, update the quantity and total
      const updatedCart = [...cart];
      //find id throught product index. updatedCart[productIndex]= updatedCart.id
      updatedCart[productIndex] = { ...cart[productIndex], quantity: cart[productIndex].quantity + 1 };

      setCart(updatedCart);
      setTotal(total + 1);
    }
  };



  const removeProducts = (productId) => {
    const removedProductIndex = cart.findIndex((item) => item.id === productId.id);

    if (removedProductIndex !== -1) {
      const updatedRemovedCart = [...cart];
      // Decrease quantity by 1 if it's greater than 0
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

const removeAllProducts = (product) => {setCart([])
  setTotal(0)
}
  const handleCheckout = () => {
    // Handle the checkout logic here, e.g., update order status, charge the user, etc.
    setCart([]);
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
            <Col className="text-center">
              <h1>Miami Shopping Store</h1>
              <h2>Shopping is exciting</h2>
            </Col>
            <Col align="center" className="p-0 rounded col-sm-1 mx-0">
              <Button style={{ backgroundColor: 'rgba(203, 190, 181, 0.5)' }} onClick={handleCartOpen} className='shadow text-dark'>
                Cart ({total})
              </Button>
              <Modal show={showCart} onHide={handleCartClose}>
                <Modal.Header closeButton>
                  <Modal.Title>Shopping Cart</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                  <Cart cart={cart} total={total} checkout={handleCheckout} />
                  <Elements stripe={stripePromise}>

                    <Checkout stripePromise={stripePromise} cart={cart} />
                  </Elements>
                </Modal.Body>
              </Modal>
            </Col>
          </Navbar>
        </Col>
      </Row>
      <Row>
        {/* Pass the addToCart function correctly */}
        <ProductList removeAllProducts={removeAllProducts} removeProducts={removeProducts} addToCart={addToCart} />
      </Row>
    </Container>
  );
}

export default App;
