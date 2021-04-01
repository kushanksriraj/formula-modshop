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

  const selectProductOnClick = (id) => {
    dispatch({
      type: "SELECT_PRODUCT",
      payload: {
        id
      }
    });
  };

  const unSelectProductOnClick = () => {
    dispatch({
      type: "UNSELECT_PRODUCT"
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

  const changeRouteOnClick = (route) => {
    dispatch({
      type: "CHANGE_ROUTE",
      payload: {
        route: route
      }
    });
  };

  return {
    ...state,
    dispatch,
    changeRouteOnClick,
    sortLowToHigh,
    sortHighToLow,
    clearSort,
    filterFastDelivery,
    filterOutOfStock,
    selectProductOnClick,
    unSelectProductOnClick
  };
};
