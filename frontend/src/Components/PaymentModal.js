import React from "react";

const PaymentModal = ({ orderData }) => {
  //console.log("This is the order modal", orderData);
  const { cartID, secondName, totalPrice } = orderData;

  // Put the payment variables here
  var payment = {
    sandbox: true, // if the account is sandbox or real
    merchant_id: "121XXXX", // Replace your Merchant ID
    return_url: "http://sample.com/return",
    cancel_url: "http://sample.com/cancel",
    notify_url: "http://sample.com/notify",
    order_id: cartID,
    items: secondName,
    amount: totalPrice,
    currency: "LKR",
    first_name: "Saman",
    last_name: "Perera",
    email: "samanp@gmail.com",
    phone: "0771234567",
    address: "No.1, Galle Road",
    city: "Colombo",
    country: "Sri Lanka",
    delivery_address: "No. 46, Galle road, Kalutara South", // optional field
    delivery_city: "Kalutara", // optional field
    delivery_country: "Sri Lanka", // optional field
    custom_1: "", // optional field
    custom_2: "", // optional field
  };

  // Called when user completed the payment. It can be a successful payment or failure
  window.payhere.onCompleted = function onCompleted(orderId) {
    console.log("Payment completed. OrderID:" + orderId);
    // Note: Validate the payment and show success or failure page to the customer
  };

  // Called when user closes the payment without completing
  window.payhere.onDismissed = function onDismissed() {
    // Note: Prompt user to pay again or show an error page
    console.log("Payment dismissed");
  };

  // Called when error happens when initializing payment such as invalid parameters
  window.payhere.onError = function onError(error) {
    // Note: Show an error page
    console.log("Error:" + error);
  };

  function pay(e) {
    e.preventDefault();
    const data = localStorage.getItem("orderDetails"); //getting orderDetails from localStorage
    const orderDetails = JSON.parse(data);
    console.log(orderDetails);
    window.payhere.startPayment(payment);
  }

  return <button onClick={(e) => pay(e)}>Pay with Payhere</button>;
};

export default PaymentModal;
