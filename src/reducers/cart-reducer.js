export const cartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: [action.payload.product, ...state.cartList]
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartList: state.cartList.filter(
          (product) => product.id !== action.payload.id
        )
      };

    case "MODIFY_CART_QTY":
      return {
        ...state,
        cartList: state.cartList.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: action.payload.quantity };
          }
          return product;
        })
      };

    default:
      throw new Error("[cartReducer]:Invalid type passed to dispatch!");
  }
};
