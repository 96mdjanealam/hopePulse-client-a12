import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import React, { useContext, useEffect, useState, useRef } from "react";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import { AuthContext } from "../../providers/AuthProvider";
import Swal from "sweetalert2";

export default function CheckoutForm() {
  const [error, setError] = useState("");
  const [clientSecret, setClientSecret] = useState("");
  const [transactionId, setTransactionId] = useState("");
  const stripe = useStripe();
  const elements = useElements();
  const axiosSecure = useAxiosSecure();
  const { user } = useContext(AuthContext);
  const [paymentAmount, setPaymentAmount] = useState(null);
  const amountInputRef = useRef(null);

  const handleAmountChange = (event) => {
    event.preventDefault();
    const amountInput = amountInputRef.current.value;
    const amount = parseFloat(amountInput);
    if (!isNaN(amount) && amount > 0) {
      setPaymentAmount(amount);
    } else {
      setPaymentAmount(null);
      amountInputRef.current.value = "";
      setError("Please enter a valid amount.");
    }
  };

  useEffect(() => {
    if (paymentAmount) {
      axiosSecure
        .post("/create-payment-intent", {
          donationAmount: paymentAmount,
        })
        .then((res) => {
          setClientSecret(res.data.clientSecret);
        });
    }
  }, [axiosSecure, paymentAmount]);

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      setError(error.message);
      setPaymentAmount(null);
    } else {
      setError("");
    }

    const { paymentIntent, error: confirmError } =
      await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: card,
          billing_details: {
            email: user?.email || "anonymous",
            name: user?.displayName || "anonymous",
          },
        },
      });

    if (confirmError) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Something went wrong!",
        showConfirmButton: false,
        timer: 1500,
      });
    } else {
      if (paymentIntent.status === "succeeded") {
        setTransactionId(paymentIntent.id);

        const payment = {
          name: user.displayName,
          email: user.email,
          amount: paymentAmount,
          transactionId: paymentIntent.id,
          date: new Date(),
        };

        const res = await axiosSecure.post("/payments", payment);
        if (res.data.insertedId) {
          Swal.fire({
            icon: "success",
            title: "Payment successful!",
            showConfirmButton: false,
            timer: 1500,
          });
        }

        amountInputRef.current.value = "";
        setPaymentAmount(null);
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="max-w-lg mx-auto min-w-full flex flex-col"
    >
      <label htmlFor="amount">Donation Amount</label>
      <div className="flex flex-col mb-4">
        <input
          className="border-2 p-2 my-2 w-full rounded-lg"
          name="amount"
          type="number"
          placeholder="Enter your donation amount here"
          ref={amountInputRef}
        />
        <button
          onClick={handleAmountChange}
          className="btn btn-sm btn-primary w-44"
        >
          Set Amount
        </button>
      </div>

      <label htmlFor="card-details">Card Details</label>
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
      {transactionId && (
        <p className="text-green-500">
          Your transaction Id:{" "}
          <span className="font-bold">{transactionId}</span>
        </p>
      )}
    </form>
  );
}
