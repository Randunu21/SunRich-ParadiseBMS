import React, { useState, useEffect } from "react";
import axios from "axios";
import swal from "sweetalert2";

const OrderSearch = () => {
  const [orders, setOrders] = useState([]);
  const [searchItem, setSearchItem] = useState("");

  useEffect(() => {
    const getOrders = () => {
      axios
        .get("http://localhost:4000/api/orders/all-orders")
        .then((res) => {
          setOrders(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    };

    getOrders();
  }, []);

  const handleSearch = (event) => {
    setSearchItem(event.target.value);
  };

  const filteredOrder = orders.filter(() => {
    orders.orderID.toLowerCase().includes(searchItem.toLowerCase());
  });
};
