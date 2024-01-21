import React, { useState, useEffect } from 'react';
import { Card, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import stripePromise from '../stripe';

const Cart = ({ cart, total }) => {
  const [newCart, setNewCart] = useState(cart);
  const [newTotal, setNewTotal] = useState(total);

  const handleRemoveItems = (product) => {
    // Check if the product is already in the cart based on its id
    const productIndex = newCart.findIndex((item) => item.id === product.id);

    if (productIndex !== -1) {
      // If the product is in the cart, update the quantity and total
      const updatedRemovedCart = [...newCart];

      // Check if the quantity is greater than 0 before decreasing it
      if (updatedRemovedCart[productIndex].quantity >= 1) {
        updatedRemovedCart[productIndex] = {
          ...updatedRemovedCart[productIndex],
          quantity: updatedRemovedCart[productIndex].quantity - 1,
        };

        setNewCart(updatedRemovedCart);
        setNewTotal(newTotal - 1);
      } else if (updatedRemovedCart[productIndex].quantity < 1) {
        const newestCart = newCart.filter((item) => item.id !== product.id);
        setNewCart(newestCart);
      }
    }
  };

  useEffect(() => {
    const findZeroItem = cart.find((item) => item.quantity < 1);
    // findZeroItem is an object
    if (findZeroItem) {
      const updatedCart = newCart.filter((items) => items.id !== findZeroItem.id);
      setNewCart(updatedCart);
    }
  }, [setNewCart, newCart, newTotal]);

  const handleRemoveAll = () => {
    setNewCart([]);
    setNewTotal(0);
  };

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!newCart) {
      console.error('newCart is undefined or null.');
      return;
    }

    console.log('newCart:', newCart);

    const { error } = await stripe.redirectToCheckout({
      lineItems: newCart.map((item) => {
        console.log('Item:', item);
        return { price: item.id, quantity: item.quantity };
      }),
      mode: 'payment',
      successUrl: `${window.location.origin}/success`,
      cancelUrl: `${window.location.origin}/cancel`,
    });

    if (error) {
      console.error(error);
    }
  };

  return (
    <div className='align-items-center'>
      <h2>Your Cart</h2>
      <ul>
        {newCart.map((item) => (
          item.quantity >= 1 ? (
            <Card className='d-flex justify-content-center align-items-center' key={item.id}>
              <img className='col-md-4' src={item.src} alt={item.name}></img>
              {item.name} - {item.quantity} - ${item.price}
              <Button
                className='bg-dark'
                onClick={() => handleRemoveItems(item)}
              >
                Remove
              </Button>
            </Card>
          ) : null
        ))}
      </ul>
      <span>
        <p>{newTotal <= 1 ? "Item" : "Items"}</p>
        <p>{newTotal}</p>
      </span>
      <div className='d-block justify-content-center align-items-center'>
        <h2 className='mx-auto'>Checkout</h2>
        <button className='mx-auto' onClick={handleCheckout}>Proceed to Checkout</button>
      </div>
      <Button onClick={handleRemoveAll}>Remove All</Button>
    </div>
  );
};

export default Cart;
