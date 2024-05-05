import React from "react";
import "./Popular.css";
import data_product from "../Asset/data";
import Item from "../Item/Item";

const Popular = (props) => {
  return (
    <div className="popular">
      <h1>COCONUT PRODUCTS</h1>
      <hr />
      <div className="popular-item">
        {props.data_product.map((item, i) => {
          return (
            <Item
              key={i}
              id={item.id}
              name={item.name}
              image={item.image}
              price={item.price}
            />
          );
        })}
      </div>
    </div>
  );
};

export default Popular;
