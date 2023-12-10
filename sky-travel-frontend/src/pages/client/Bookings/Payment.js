import { useEffect, useState } from "react";

import { Elements } from "@stripe/react-stripe-js";
import CheckoutForm from "./CheckoutForm";
import { loadStripe } from "@stripe/stripe-js";

function Payment() {
  const [stripePromise, setStripePromise] = useState(null);
  const [clientSecret, setClientSecret] = useState("");

  useEffect(() => {
    fetch("http://localhost:5000/config",{
      method: "GET",
    }).then(async (r) => {
      const { publishableKey } = await r.json();
      console.log(publishableKey)
      setStripePromise(loadStripe(publishableKey));
    });
  }, []);

  useEffect(() => {
    const booking = sessionStorage.getItem("bookingInfo");
    const amount = JSON.parse(booking).price;
  
    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/create-payment-intent", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ amount }),
        });
  
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
  
        const { clientSecret } = await response.json();
        setClientSecret(clientSecret);
        console.log(clientSecret);
      } catch (error) {
        console.error("Error fetching payment intent:", error);
      }
    };
  
    fetchData();
  }, []);
  

  return (
    <>
      <br></br>
      <h3>Payment</h3>     
      {clientSecret && stripePromise && (
        <Elements stripe={stripePromise} options={{ clientSecret }}>
          <CheckoutForm />
        </Elements>
      )}
    </>
  );
}

export default Payment;
