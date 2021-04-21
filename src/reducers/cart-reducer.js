export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        cartList: [action.payload.product, ...state.cartList],
      };

    case "REMOVE_FROM_CART":
      return {
        cartList: state.cartList.filter(
          (product) => product.product !== action.payload.productId
        ),
      };

    case "MODIFY_CART_QTY":
      return {
        cartList: state.cartList.map((product) => {
          if (product.product === action.payload.productId) {
            return { ...product, quantity: action.payload.quantity };
          }
          return product;
        }),
      };

    case "INITIALIZE":
      return {
        cartList: action.payload.list,
      };

    default:
      throw new Error("[cartReducer]:Invalid type passed to dispatch!");
  }
};
