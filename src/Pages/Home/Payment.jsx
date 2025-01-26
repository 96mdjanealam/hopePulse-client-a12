import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React from "react";
import CheckoutForm from "./CheckoutForm";

// todo: add publishable key
const stripePromise = loadStripe(import.meta.env.VITE_Payment_Gateway_PK);

export default function Payment() {
  return (
    <div className="p-6 lg:pl-44 mt-10 mb-10 flex flex-col gap-4">
      <h1 className="text-4xl max-w-md">Payment</h1>
      <p className="max-w-md">Please make contribution to lives</p>

      <div className="max-w-md mt-6">
        <Elements stripe={stripePromise}>
          <CheckoutForm />
        </Elements>
      </div>
    </div>
  );
}
