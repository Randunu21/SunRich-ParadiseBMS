import React from "react";
import "./NewCollections.css";
import new_collection from "../Asset/new_collections";
import Item from "../Item/Item";
const NewCollections = (props) => {
  return (
    <div className="new-collections">
      <h1>NEW PRODUCTS</h1>
      <hr />
      <div className="collections">
        {props.spices.map((item, i) => {
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

export default NewCollections;
