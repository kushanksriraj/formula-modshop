export const wishListReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_WISHLIST":
      return {
        wishList: [{ product: action.payload.productId }, ...state.wishList],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        wishList: state.wishList.filter(
          (product) => product.product !== action.payload.productId
        ),
      };

    case "INITIALIZE":
      return {
        wishList: action.payload.list
      }

    default:
      throw new Error("[wishListReducer]: Invalid type passed to dispatch!");
  }
};
