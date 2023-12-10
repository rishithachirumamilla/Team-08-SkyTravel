import React, { Component } from "react";
import StripeCheckout from "react-stripe-checkout";
import axios from "axios";
const Payment = ()=>{
const CURRENCY = "USD";
const STRIPE_PUBLISHABLE =
    "pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz";
const PAYMENT_SERVER_URL = "http://localhost:5000/api/payment/";
const onToken = (amount, description) => token =>
    axios.post(PAYMENT_SERVER_URL,
        {
            description,
            source: token.id,
            currency: CURRENCY,
            amount: fromDollarToCent(amount)
        },

        {
            headers: {
                "x-access-token": localStorage.getItem("token"),
            },
        }

    )

//PassengerFirstName, PassengerLastName, PassengerType, PassengerPassportNumber , FlightId ,  ChosenSeat , CabinSeat
const fromDollarToCent = (amount) => parseInt(amount * 100);


        const { name, description, amount } = this.props;
        return (
            <div className="flex-col">
                <StripeCheckout
                    name={name}
                    description={description}
                    amount={fromDollarToCent(amount)}
                    token={onToken(amount, description)}
                    currency={CURRENCY}
                    stripeKey={
                        "pk_test_51K73UMBOwmEi06NGKInoBOHQZH6q5QMvgFA5eWxahjTwpCxe6N8A1yUjeffUbxVWPjNNHBsN0Bjj0sodqsIsSu9n00bJez3NKz"
                    }
                    zipCode
                    email
                    allowRememberMe
                />
            </div>
        );
    
}

export default Payment;