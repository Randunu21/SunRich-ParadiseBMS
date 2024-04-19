import React, { useState } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; //get details from order history

const DeliveryDetails = () => {
  const location = useLocation();

  const { orderDetails } = location.state || { orderDetails: {} };

  const [firstName, setFirstName] = useState(orderDetails.firstName || "");
  const [secondName, setSecondName] = useState(orderDetails.secondName || "");
  const [shippingAddress1, setShippingAdddress1] = useState(
    orderDetails.shippingAddress1 || ""
  );
  const [shippingAddress2, setShippingAdddress2] = useState(
    orderDetails.shippingAddress2 || ""
  );
  const [city, setCity] = useState(orderDetails.city || "");
  const [postalCode, setPostalCode] = useState(orderDetails.postalCode || "");
  const [email, setEmail] = useState(orderDetails.email || "");
  const [country, setCountry] = useState(orderDetails.country || "");

  const checkOut = (e) => {
    e.preventDefault();

    const newOrder = {
      firstName,
      secondName,
      shippingAddress1,
      shippingAddress2,
      city,
      postalCode,
      email,
      country,
    };

    axios
      .post("http://localhost:4000/api/orders/addOrder", newOrder)
      .then(() => {
        alert("Order Successful");
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div class="container">
      <form class="row g-3">
        <div class="col-md-6">
          <label for="inputFirstName" class="form-label">
            First Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputFirstName"
            value={firstName}
            onChange={(e) => {
              setFirstName(e.target.value);
            }}
          />
        </div>

        <div class="col-md-6">
          <label for="inputSecondName" class="form-label">
            Second Name
          </label>
          <input
            type="text"
            class="form-control"
            id="inputSecondName"
            value={secondName}
            onChange={(e) => {
              setSecondName(e.target.value);
            }}
          />
        </div>

        <div class="col-12">
          <label for="inputAddress" class="form-label">
            Address
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress"
            placeholder="1234 Main St"
            value={shippingAddress1}
            onChange={(e) => {
              setShippingAdddress1(e.target.value);
            }}
          />
        </div>

        <div class="col-12">
          <label for="inputAddress2" class="form-label">
            Address 2
          </label>
          <input
            type="text"
            class="form-control"
            id="inputAddress2"
            placeholder="Apartment, studio, or floor"
            value={shippingAddress2}
            onChange={(e) => {
              setShippingAdddress2(e.target.value);
            }}
          />
        </div>

        <div class="col-md-6">
          <label for="inputCity" class="form-label">
            City
          </label>
          <input
            type="text"
            class="form-control"
            id="inputCity"
            value={city}
            onChange={(e) => {
              setCity(e.target.value);
            }}
          />
        </div>

        <div class="col-md-4">
          <label for="inputCountry" class="form-label">
            Country
          </label>
          <select
            id="inputCountry"
            class="form-select"
            value={country}
            onChange={(e) => {
              setCountry(e.target.value);
            }}
          >
            <option selected>Choose...</option>
            <option>Sri Lanka</option>
            <option>Russia</option>
            <option>India</option>
          </select>
        </div>

        <div class="col-md-2">
          <label for="inputZip" class="form-label">
            Postal Code
          </label>
          <input
            type="text"
            class="form-control"
            id="inputZip"
            value={postalCode}
            onChange={(e) => {
              setPostalCode(e.target.value);
            }}
          />
        </div>

        <div class="col-md-6">
          <label for="inputEmail4" class="form-label">
            Email
          </label>
          <input
            type="email"
            class="form-control"
            id="inputEmail4"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
            }}
          />
        </div>

        <div class="col-12">
          <button
            type="submit"
            class="btn btn-primary"
            style={{ backgroundColor: "#00ff00" }}
            onClick={checkOut}
          >
            Check Out
          </button>
        </div>
      </form>
    </div>
  );
};

export default DeliveryDetails;
