import React from "react";
import Hero from "../../Components/Hero/Hero";
import Popular from "../../Components/Popular/Popular";
import Offers from "../../Components/Offers/Offers";
import NewCollections from "../../Components/NewCollections/NewCollections";
import NewsLetter from "../../Components/NewsLetter/NewsLetter";
import { useState, useEffect } from "react";

const Home = () => {
  const [products, setProducts] = useState([]);
  const [spices, setSpices] = useState([]);

  const fetchInfo = () => {
    fetch("http://localhost:4000/api/products/coconut")
      .then((res) => res.json())
      .then((data) => setProducts(data));
    fetch("http://localhost:4000/api/products/spices")
      .then((res) => res.json())
      .then((data) => setSpices(data));
  };

  useEffect(() => {
    fetchInfo();
  }, []);

  return (
    <div>
      <Hero />
      <Popular data_product={products} />
      <Offers />
      <NewCollections spices={spices} />
      <NewsLetter />
    </div>
  );
};

export default Home;
