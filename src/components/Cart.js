import React, { useState } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Checkout from './Checkout';
const Cart = ({ cart, handleCheckout, total }) => {
  const [newCart, setNewCart] = useState(cart);
  const [newTotal, setNewTotal] = useState(total);

  const handleRemoveItems = (product) => {
    // Check if the product is already in the cart based on its id
    const productIndex = newCart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      // If the product is in the cart, update the quantity and total
      const updatedRemovedCart = [...newCart];

      // Check if the quantity is greater than 0 before decreasing it
      if (updatedRemovedCart[productIndex].quantity > 0) {
        updatedRemovedCart[productIndex] = {
          ...updatedRemovedCart[productIndex],
          quantity: updatedRemovedCart[productIndex].quantity - 1,
        };

        setNewCart(updatedRemovedCart);
        setNewTotal(newTotal - 1);
      }
    }
  };






  const handleRemoveAll = () => {
    setNewCart([]);
    setNewTotal(0);
  };



  return (
    <div>
      <h2>Your Cart</h2>
      <ul>
        {newCart.map((item) => (
          <Card className='d-flex justify-content-center align-items-center' key={item.id}>
            <img className='col-md-4' src={item.src}></img>
            {item.name} - {item.quantity} - ${item.price}


            <Button
              className='bg-dark'
              onClick={() => handleRemoveItems(item)}
            >
              Remove
            </Button>
          </Card>
        ))}
      </ul>
      <span>
        <p>{newTotal <= 1 ? "Item" : "Items"}</p>
        <p>{newTotal}</p>
      </span>
      <Checkout handleCheckout cart={newCart}/>
      <Button onClick={handleRemoveAll}>Remove All</Button>
    </div>
  );
};

export default Cart;
