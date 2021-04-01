import { createContext, useReducer } from "react";
import { controlReducer } from "../reducers";

export const ControlContext = createContext();

export const ControlProvider = ({ children }) => {
  const [state, dispatch] = useReducer(controlReducer, {
    sortBy: "DEFAULT",
    route: "home",
    isProductSelected: false,
    selectedProductId: null,
    filters: {
      showAllInventory: true,
      showFastDeliveryOnly: false
    }
  });

  return (
    <ControlContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ControlContext.Provider>
  );
};
