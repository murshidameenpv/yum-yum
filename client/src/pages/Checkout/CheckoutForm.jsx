import { CardElement } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import { useElements, useStripe } from "@stripe/react-stripe-js";
import { FaPaypal, FaStripeS } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";

function CheckoutForm({ price, cart }) {
  const stripe = useStripe();
  const elements = useElements();
  const [cardError, setCardError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const user = useAuth();
    const axiosSecure = useAxiosSecure();

useEffect(() => {
  const createPaymentIntent = async () => {
    try {
      if (typeof price === "number" && price > 1) {
        const response = await axiosSecure.post(
          "/stripe/create-payment-intent",
          { price }
        );
          setClientSecret(response.data?.clientSecret);
      } else {
        console.error("Price must be a number and greater than 1");
        return;
      }
    } catch (error) {
      console.error(error);
    }
  };
  createPaymentIntent();
}, [axiosSecure, price]);

    console.log(clientSecret,"ooooooooooo");

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!stripe || !elements) {
      // Stripe.js has not loaded yet. Make sure to disable
      // form submission until Stripe.js has loaded.
      return;
    }
    // Get a reference to a mounted CardElement. Elements knows how
    // to find your CardElement because there can only ever be one of
    // each type of element.
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    // Use your card Element with other Stripe.js APIs
    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setCardError(error);
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setCardError("");
    }
    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            name: user?.displayName,
            email: user?.email,
          },
        },
      });
      if (confirmError) {
          console.log(confirmError);
      }
      console.log(paymentIntent,"ooooooooo");
  };
  return (
    <div className="flex flex-col sm:flex-row gap-8">
      {/* lefside */}
      <div className="md:w-1/2 w-full space-y-3">
        <h2 className="text-xl font-bold">Order Summary</h2>
        <p>Total Price: ${price}</p>
        <p>Number of Items : {cart.length}</p>
      </div>
      {/* rightside */}
      <div className="md:w-1/2 space-y-5 card shrink-0 w-full max-w-sm shadow-2xl bg-base-100 px-8 py-4">
        <h2 className="text-xl font-bold">Complete Your Payment</h2>
        <h5 className="font-medium">Credit / Debit Card</h5>
        {/* stripe form */}
        <form onSubmit={handleSubmit}>
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: "16px",
                  color: "#424770",
                  "::placeholder": {
                    color: "#aab7c4",
                  },
                },
                invalid: {
                  color: "#9e2146",
                },
              },
            }}
          />
          <button
            className="btn bg-custom-purple text-white  my-3 shadow-2xl w-full"
            type="submit"
            disabled={!stripe}
          >
            <FaStripeS />
            Pay
          </button>
          {cardError && (
            <p className="text-rose-900 italic">{cardError.message}</p>
          )}
        </form>
        <div className="mt-5 text-center">
          <hr />
          <button
            className="btn bg-yellow-600 text-blue-800 w-36 my-3 shadow-2xl"
            type="submit"
          >
            <FaPaypal />
            Pay
          </button>
        </div>
      </div>
    </div>
  );
}

export default CheckoutForm;
