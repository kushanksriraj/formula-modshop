export const controlReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ROUTE":
      return {
        ...state,
        route: action.payload.route,
        isProductSelected: false,
        selectedProductId: null
      };

    case "SELECT_PRODUCT":
      return {
        ...state,
        isProductSelected: true,
        selectedProductId: action.payload.id
      };

    case "UNSELECT_PRODUCT":
      return {
        ...state,
        isProductSelected: false,
        selectedProductId: null
      };

    case "SORT":
      return { ...state, sortBy: action.payload.type };

    case "TOGGLE_INVENTORY":
      return {
        ...state,
        filters: {
          ...state.filters,
          showAllInventory: !state.filters.showAllInventory
        }
      };

    case "TOGGLE_DELIVERY":
      return {
        ...state,
        filters: {
          ...state.filters,
          showFastDeliveryOnly: !state.filters.showFastDeliveryOnly
        }
      };

    default:
      throw new Error("[controlReducer]:Invalid type passed to dispatch!");
  }
};
