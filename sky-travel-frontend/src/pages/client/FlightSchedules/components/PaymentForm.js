// PaymentForm.js
import React from "react";
//import { CardElement, injectStripe } from "react-stripe-elements";
import CSmButton from "../../../../components/form/CSmButton";

class PaymentForm extends React.Component {
  handleSubmit = async (e) => {
    e.preventDefault();
    const { stripe, passengerInfo, flightData } = this.props;

    try {
      const { token } = await stripe.createToken();
      // Send the token to your server for further processing
      // This is where you would handle the payment on your server
      console.log("Token:", token);

      // For demonstration purposes, you can redirect after successful payment
      // Replace this f your actual logic for handling payment success
      this.props.history.push("/payment-success");
    } catch (error) {
      console.error("Error processing payment:", error);
      // Handle payment error
    }
  };

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <label>Card details</label>
        {/* <CardElement />
        <CSmButton title="Pay" type="submit" /> */}
      </form>
    );
  }
}

export default PaymentForm;
