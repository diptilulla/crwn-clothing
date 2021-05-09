import React from "react";
import StripeCheckout from "react-stripe-checkout";

const StripeCheckoutButton = ({ price }) => {
  const priceForStripe = price * 100;
  const publishableKey =
    "pk_test_51IpHIwSBgPQIaieJMC7nrYmDVSqNrql4csRtSzgPdkBMjkHW83ltzbOrZKJxfcmQnR5BCG5DoikHW9biSWGMmBUF00Trkr3SKE";

  const onToken = (token) => {
    console.log(token);
    alert("Payment Successful");
  };

  return (
    <StripeCheckout
      label="Pay Now"
      name="CRWN Clothing Ltd."
      billingAddress
      shippingAddress
      image="https://svgshare.com/i/CUz.svg"
      description={`Your total is $${price}`}
      amount={priceForStripe}
      panelLabel="Pay Now"
      token={onToken} //on success callback, triggers when submit
      stripeKey={publishableKey}
    />
  );
};

export default StripeCheckoutButton;
