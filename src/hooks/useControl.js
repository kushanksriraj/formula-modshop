import { ControlContext } from "../contexts";
import { useContext } from "react";

export const useControl = () => {
  const { state, dispatch } = useContext(ControlContext);

  const filterOutOfStock = () => {
    dispatch({
      type: "TOGGLE_INVENTORY"
    });
  };

  const filterFastDelivery = () => {
    dispatch({
      type: "TOGGLE_DELIVERY"
    });
  };

  const sortLowToHigh = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "LOW_TO_HIGH"
      }
    });
  };
  const sortHighToLow = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "HIGH_TO_LOW"
      }
    });
  };

  const clearSort = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "DEFAULT"
      }
    });
  };

  return {
    ...state,
    dispatch,
    sortLowToHigh,
    sortHighToLow,
    clearSort,
    filterFastDelivery,
    filterOutOfStock
  };
};
