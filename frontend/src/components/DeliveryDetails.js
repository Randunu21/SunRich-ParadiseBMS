import React, { useState } from "react";
import axios from "axios";

const DeliveryDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [secondName, setSecondName] = useState("");
  const [shippingAddress1, setShippingAdddress1] = useState("");
  const [shippingAddress2, setShippingAdddress2] = useState("");
  const [city, setCity] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [email, setEmail] = useState("");
  const [country, setCountry] = useState("");

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
