import React, { createContext } from "react";
import all_product from "../Components/Asset/all_product";

export const HomeContext = createContext(null);

const HomeContextProvider = (props) => {
  const contextValue = { all_product };

  return (
    <HomeContext.Provider value={contextValue}>
      {props.Human}
    </HomeContext.Provider>
  );
};

export default HomeContextProvider;
