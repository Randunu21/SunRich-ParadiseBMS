import React, { useContext } from "react";
import ProductDisplay from "../Components/ProductDisplay/ProductDisplay";
import DescriptionBox from "../Components/DescriptionBox/DescriptionBox";
import RelatedProducts from "../Components/RelatedProducts/RelatedProducts";
import { useParams } from "react-router-dom";
import { ShopContext } from "../Context/ShopContext";

const Product = () => {
  const { products } = useContext(ShopContext);
  console.log("products:", products);
  const { productID } = useParams();
  console.log("productID:", productID);
  const product = products.find((e) => e.productID === Number(productID));
  return (
    <div>
      <ProductDisplay product={product} />
      <DescriptionBox />
      <RelatedProducts />
    </div>
  );
};

export default Product;
