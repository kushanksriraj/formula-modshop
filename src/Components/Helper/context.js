import { createContext, useContext, useReducer } from "react";
import { data } from "../../data";

const ProductContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case "CHANGE_ROUTE":
      return { ...state, route: action.payload.route };

    case "CHANGE_ROUTE_ON_SELECT":
      return {
        ...state,
        route: action.payload.route,
        selectedProductId: action.payload.id
      };

    case "SORT":
      return { ...state, sortBy: action.payload.type };

    case "ADD_TO_CART":
      if (
        state.cart.filter((product) => product.id === action.payload.id).length
      ) {
        return state;
      } else {
        return {
          ...state,
          cart: state.cart.concat({
            ...state.productList.filter(
              ({ id }) => id === action.payload.id
            )[0],
            quantity: 1
          })
        };
      }

    case "REMOVE_FROM_CART":
      return {
        ...state,
        cart: state.cart.filter((product) => product.id !== action.payload.id)
      };

    case "INCREMENT_CART":
      return {
        ...state,
        cart: state.cart.map((product) => {
          if (product.id === action.payload.id) {
            return { ...product, quantity: product.quantity + 1 };
          }
          return product;
        })
      };

    case "DECREMENT_CART":
      if (
        state.cart.filter((product) => product.id === action.payload.id)[0]
          .quantity > 1
      ) {
        return {
          ...state,
          cart: state.cart.map((product) => {
            if (product.id === action.payload.id) {
              return { ...product, quantity: product.quantity - 1 };
            }
            return product;
          })
        };
      } else {
        return state;
      }

    case "ADD_TO_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.concat(
          state.productList.filter(
            (product) => product.id === action.payload.id
          )[0]
        )
      };

    case "REMOVE_FROM_WISHLIST":
      return {
        ...state,
        wishlist: state.wishlist.filter(
          (product) => product.id !== action.payload.id
        )
      };

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
      throw new Error("Invalid type passed to dispatch!");
  }
};

export const ProductProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, {
    productList: data,
    sortBy: "DEFAULT",
    wishlist: [],
    cart: [],
    route: "home",
    selectedProductId: null,
    filters: {
      showAllInventory: true,
      showFastDeliveryOnly: false
    }
  });

  return (
    <ProductContext.Provider
      value={{
        state,
        dispatch
      }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const useProduct = () => {
  return useContext(ProductContext);
};

export const useRoute = () => {
  const {
    state: { route },
    dispatch
  } = useProduct();

  return { route, dispatch };
};
