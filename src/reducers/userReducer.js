export const userReducer = (state, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      return {
        ...state,
        cartList: [
          ...state.cartList,
          {
            product: action.payload.product,
            quantity: 1,
          },
        ],
      };

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cartList: state.cartList.filter(
          ({ product }) => product !== action.payload.product
        ),
      };

    case "INCREMENT_CART":
      return {
        ...state,
        cartList: state.cartList.map((item) => {
          if (item.product === action.payload.product) {
            return { ...item, quantity: item.quantity + 1 };
          }
          return item;
        }),
      };

    case "DECREMENT_CART":
      return {
        ...state,
        cartList: state.cartList.map((item) => {
          if (item.product === action.payload.product) {
            return { ...item, quantity: item.quantity - 1 };
          }
          return item;
        }),
      };

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishList: [...state.wishList, action.payload.product],
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishList: state.wishList.filter(
          (product) => product !== action.payload.product
        ),
      };

    case "INITIALIZE_CART":
      return {
        ...state,
        cartList: action.payload.cartList || [],
      };

    case "INITIALIZE_WISHLIST":
      return {
        ...state,
        wishList: action.payload.wishList || [],
      };

    case "FLUSH_DATA":
      return {
        cartList: [],
        wishList: [],
        paymentList: [],
        addressList: [],
        orderList: [],
      };

    default:
      break;
  }
};
