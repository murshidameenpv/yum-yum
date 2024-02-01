import React from 'react'
import CheckoutForm from './CheckoutForm';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from "@stripe/stripe-js";
import useCart from "../../hooks/useCart.jsx";

const STRIPE_APIKEY = import.meta.env.VITE_STRIPE_APIKEY;
const stripePromise = loadStripe(STRIPE_APIKEY);
function Payment() {
  // console.log(STRIPE_APIKEY, "ppppppppppp");
  // console.log(stripePromise);
  const [cart] = useCart();
  // console.log(cart,"oooo");
  const cartTotal = cart.reduce((sum, item) => sum + item.price, 0);
  const totalPrice = parseFloat(cartTotal.toFixed(2));
  // console.log(totalPrice);
  return (
    <div className="section-container py-28">
      <div className="max-w-screen-2xl section-container bg-gradient-to-r from-[#FAFAFA] from-0% to-[#FCFCFC] to-100%">
        <Elements stripe={stripePromise}>
          <CheckoutForm price={totalPrice} cart={cart} />
        </Elements>
      </div>
    </div>
  );
}

export default Payment