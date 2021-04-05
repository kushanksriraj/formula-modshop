export const controlReducer = (state, action) => {
  switch (action.type) {
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
