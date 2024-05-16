import React, { useContext, useState } from "react";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";
import DisplayFeedback from "../Components/DisplayFeedback";

const Product = () => {
  const { products } = useContext(ShopContext);
  console.log("products:", products);
  const { productID } = useParams();
  console.log("productID:", productID);
  const product = products.find((e) => e.productID === productID);

  const [showDescription, setShowDescription] = useState(true);
  const [showReviews, setShowReviews] = useState(false);

  const toggleDescription = () => {
    setShowDescription(true);
    setShowReviews(false);
  };

  const toggleReviews = () => {
    setShowDescription(false);
    setShowReviews(true);
  };
  return (
    <div>
      <ProductDisplay product={product} />
      <div className="d-flex justify-content-center mt-3">
        <button
          className={`btn ${
            showDescription ? "btn-success" : "btn-outline-success"
          }`}
          onClick={toggleDescription}
        >
          Description
        </button>
        <button
          className={`btn ${
            showReviews ? "btn-success" : "btn-outline-success"
          }`}
          onClick={toggleReviews}
        >
          Reviews
        </button>
      </div>
      {showDescription && <DescriptionBox />}
      {showReviews && <DisplayFeedback />}
      <RelatedProducts />
    </div>
  );
};

export default Product;
