import axios from "axios";
import { useState } from "react";
import { PayPalButtons } from "@paypal/react-paypal-js";
import Swal from "sweetalert2";

//holds logic and styling for checkout button
const PaypalCheckoutButton = (props) => {
  //retreive information from props
  const { newOrder, totalPrice, email } = props.obj;

  const [paidFor, setPaidFor] = useState(false);
  const [error, setError] = useState(null);

  console.log("These are order etails", newOrder, totalPrice, email);

  //method to be executed if payment success
  const handleApprove = (orderID) => {
    setPaidFor(true);

    //make order if online payment is success
    axios
      .post("http://localhost:4000/api/orders/addOrder", newOrder)
      .then((res) => {
        console.log(res);
        axios.patch(
          `http://localhost:4000/api/cart/updateCart/status/${newOrder.cartID}`,
          { status: "Completed", type: "orderCart" }
        );
        Swal.fire("Order Successful", "", "success");
        window.location.replace("http://localhost:3000/products/home");
      })
      .catch((err) => {
        Swal.fire("Error", "Failed to place the order", "error");
      });
  };

  if (paidFor) {
    //success notification
    alert("Thankyou for your purchase");
  }

  if (error) {
    //payment unsuccess notification
    alert(error);
  }

  return (
    // button style
    <PayPalButtons
      style={{
        color: "silver",
        layout: "horizontal",
        height: 48,
        width: 50,
        tagline: false,
        shape: "pill",
      }}
      onClick={(data, actions) => {
        //validation on button click
        const hasAlreadyBoughtProduct = false;

        if (hasAlreadyBoughtProduct) {
          setError("One or more items have already been selected");

          return actions.reject();
        } else {
          return actions.resolve();
        }
      }}
      createOrder={(data, actions) => {
        return actions.order.create({
          purchase_units: [
            {
              amount: {
                value: totalPrice,
              },
            },
          ],
        });
      }}
      onCancel={() => {
        //executes if payment is cancelled
        //goes back to checkout page
      }}
      onApprove={async (data, actions) => {
        //executes if payment is a success
        const order = await actions.order.capture();
        console.log("order", order);
        handleApprove(data.orderID);
      }}
      onError={(err) => {
        //executes if payment is unsuccess
        //set error message
        setError(
          "Your payment was not processed successfully. We are unable to fulfill your purchase. Please contact us at spsh@gmail.com for assistance."
        );
        setError(err);
        console.error("PayPal Checkout on Error", err);
      }}
    />
  );
};

export default PaypalCheckoutButton;
