import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useEffect, useState } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";

export default function CheckoutForm() {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const [paymentAmount, setPaymentAmount] = useState(null);

  const handleAmountChange = (event) => {
    event.preventDefault(); // Prevent form submission
    const amountInput = event.target.form.amount.value; // Access the input value directly
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setPaymentAmount(amount); // Set the payment amount
      
    } else {
      setPaymentAmount(null);
      setError("Please enter a valid amount.");
     
    }
  };

  // payment post req
  useEffect(() => {
    console.log(paymentAmount)
    axiosSecure
      .post("/create-payment-intent", {
        donationAmount: paymentAmount,
      })
      .then((res) => {
        console.log(res.data.clientSecret);
        setClientSecret(res.data.clientSecret);
      });
  }, [axiosSecure, paymentAmount]);

  // handle submit
  const handleSubmit = async (event) => {
    event.preventDefault();
    console.log(paymentAmount)

    if (!stripe || !elements) {
      return;
    }
    const card = elements.getElement(CardElement);

    if (card == null) {
      return;
    }

    const { error, paymentMethod } = await stripe.createPaymentMethod({
      type: "card",
      card,
    });

    if (error) {
      console.log("[error]", error);
      setError(error.message);
      setPaymentAmount(null)
    } else {
      console.log("[PaymentMethod]", paymentMethod);
      setError("");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="max-w-lg mx-auto min-w-full flex flex-col">
      <label htmlFor="">Donation Amount</label>
      <div className="flex flex-col mb-4">
      <input
        className="border-2 p-2 my-2 w-full rounded-lg"
        name="amount"
        type="number"
        placeholder="Enter your donation amount here"
      />
      <button
      onClick={handleAmountChange}
      className="btn btn-sm btn-primary w-44" >Set Amount</button>
      </div>
      
      <label htmlFor="">Card Details</label>
      <CardElement
        className="border-2 p-2 rounded-lg my-2"
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
        className="btn btn-sm btn-success w-44"
        type="submit"
        disabled={!stripe || !clientSecret}
      >
        Pay
      </button>
      <p className="text-red-500 mt-4">{error}</p>
    </form>
  );
}
