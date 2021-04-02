export const wishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishList: [action.payload.product, ...state.wishList]
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product.productId !== action.payload.productId
        )
      };

    default:
      throw new Error("[wishListReducer]: Invalid type passed to dispatch!");
  }
};
