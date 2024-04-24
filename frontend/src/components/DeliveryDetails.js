import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom"; //get details from order history
//import useHistory from "react-router-dom";

import swal from "sweetalert2";

const DeliveryDetails = () => {
  const location = useLocation();
  //const history = useHistory();

  const { orderDetails = {} } = location.state || { orderDetails: {} };
  const { cart = {} } = location.state || { cart: {} };

  const cartID = cart._id || cart;
  //const [cartDetails, setCartDetails] = useState(cart);

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
  const [phone, setPhone] = useState(orderDetails.phone || "");

  useEffect(() => {
    // Load Google Maps JavaScript API asynchronously
    const script = document.createElement("script");
    script.src = `https://maps.googleapis.com/maps/api/js?key=AIzaSyCqQQBR570AJLhGDn8E8xy5xEMi17G23AM&libraries=places`;
    script.defer = true;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleGeocode = () => {
    // Use Google Geocoding API to convert address to coordinates
    const address = `${shippingAddress1}, ${shippingAddress2}, ${city}, ${country}`;
    const geocoder = new window.google.maps.Geocoder();
    geocoder.geocode({ address }, (results, status) => {
      if (status === "OK") {
        // Display the location on a map
        const map = new window.google.maps.Map(document.getElementById("map"), {
          center: results[0].geometry.location,
          zoom: 15,
        });

        // Add a marker for the location
        new window.google.maps.Marker({
          map,
          position: results[0].geometry.location,
        });
      } else {
        alert("Geocode was not successful for the following reason: " + status);
      }
    });
  };

  const checkOut = (e) => {
    e.preventDefault();

    const newOrder = {
      cartID,
      firstName,
      secondName,
      shippingAddress1,
      shippingAddress2,
      city,
      postalCode,
      email,
      country,
    };

    swal
      .fire({
        title: "Are you sure?",
        text: "Do you want to proceed with the checkout?",
        icon: "question",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, proceed!",
      })
      .then((result) => {
        if (result.isConfirmed) {
          axios
            .post("http://localhost:4000/api/orders/addOrder", newOrder)
            .then(() => {
              axios.patch(
                `http://localhost:4000/api/cart/updateCart/status/${cartID}`,
                { status: "Completed" }
              );
              swal.fire("Order Successful", "", "success");
            })
            .catch((err) => {
              swal.fire("Error", "Failed to place the order", "error");
            });
        }
      });
  };

  const addQuotes = (e) => {
    e.preventDefault();

    const newQuotation = {
      cartID,
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
      .post("http://localhost:4000/api/quotations/addQuotation", newQuotation)
      .then(() => {
        axios.patch(
          `http://localhost:4000/api/cart/updateCart/status/${cartID}`,
          { status: "Completed" }
        );
        alert("Quotation added"); //alert
      })
      .catch((err) => {
        alert(err);
      });
  };

  return (
    <div>
      <style>
        {`
      body {
        background: #dbf8e3;
      }
    `}
      </style>
      <div className="container">
        <p>cart : {cartID}</p>
        <div className="row">
          <div className="col-md-6">
            <form className="row g-3">
              <div className="col-md-6">
                <label htmlFor="inputFirstName" className="form-label">
                  First Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputFirstName"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
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
                <input
                  id="inputCountry"
                  class="form-control"
                  value={country}
                  onChange={(e) => {
                    setCountry(e.target.value);
                  }}
                />
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
              <div class="col-md-6">
                <label for="inputEmail4" class="form-label">
                  Phone Number
                </label>
                <input
                  type="phone"
                  class="form-control"
                  id="inputPhone"
                  value={phone}
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                />
              </div>

              <div className="col-12">
                <button
                  type="button"
                  className="btn btn-primary"
                  onClick={() => handleGeocode()}
                >
                  Geocode Address
                </button>
              </div>

              <div className="col-12 d-flex justify-content-between">
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(e) => checkOut(e)}
                  disabled={!country || country.toLowerCase() !== "sri lanka"}
                >
                  Check Out
                </button>
                <div style={{ width: "5px" }}></div>{" "}
                <button
                  type="submit"
                  className="btn btn-success"
                  onClick={(e) => addQuotes(e)}
                >
                  Get Quotations
                </button>
              </div>
            </form>
          </div>
          <div className="col-md-6">
            <div id="map" style={{ width: "100%", height: "400px" }}></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeliveryDetails;
