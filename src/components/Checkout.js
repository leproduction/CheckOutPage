import React from 'react';
import stripePromise from '../stripe';

const Checkout = ({ cart }) => {
  const cartCheckOut = cart;

  const handleCheckout = async () => {
    const stripe = await stripePromise;

    if (!cartCheckOut) {
      console.error('cartCheckOut is undefined or null.');
      return;
    }

    console.log('cartCheckOut:', cartCheckOut);

    const { error } = await stripe.redirectToCheckout({
      lineItems: cartCheckOut.map((item) => {
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
    <div>
      <h2>Checkout</h2>
      <button onClick={handleCheckout}>Proceed to Checkout</button>
    </div>
  );
};

export default Checkout;
