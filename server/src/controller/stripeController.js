import Stripe from "stripe";
import dotenv from "dotenv";
dotenv.config();
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export const stripeIntent = async (req, res) => {
  try {
    const { price } = req.body;
    const subTotal = price * 1000;
    console.log(price, "oooooooooooo");

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: subTotal,
      currency: "inr",
      statement_descriptor_suffix: "Payment Using Stripe",
      payment_method_types: ["card"],
    });

    res.send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error(error);
    res
      .status(500)
      .send({ error: "An error occurred while creating the payment intent." });
  }
};

export const stripeSuccess = (req, res) => {
  res.send("Payment successfull")
};
export const stripeFailure = (req, res) => {
  res.send("Payment is not done")
};
