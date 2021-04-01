import { CartContext } from "../contexts/";
import { useContext, useEffect } from "react";
import { useProduct } from "../hooks";
import { useAxios } from "../hooks/useAxios";

export const useCart = () => {
  const {
    state: { cartList },
    dispatch
  } = useContext(CartContext);

  const { productList } = useProduct();

  const { apiCall, response, isError, isLoading } = useAxios();

  useEffect(() => {
    if (response) {
      switch (response.config.method) {
        case "post":
          if (response.status === 201) {
            dispatch({
              type: "ADD_TO_CART",
              payload: {
                product: response.data.cartList
              }
            });
          }
          break;

        case "delete":
          if (response.status === 200) {
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: {
                id: response.data
              }
            });
          }

          break;

        case "patch":
          console.log({ response });
          if (response.status === 200) {
            dispatch({
              type: "MODIFY_CART_QTY",
              payload: {
                id: response.data.cartList.id,
                quantity: response.data.cartList.quantity
              }
            });
          }
          break;

        case "get":
          console.log({ response });
          break;

        default:
          break;
      }
    }
  }, [response]);

  const addToCart = (id) => {
    const product = productList.filter((product) => product.id === id)[0];

    apiCall({
      type: "post",
      url: "/api/cart-list",
      body: {
        product: {
          ...product,
          quantity: 1
        }
      }
    });
  };

  const removeFromCart = (id) => {
    apiCall({
      type: "delete",
      url: `/api/cart-list/${id}`
    });
  };

  const decrement = (id) => {
    const prevQty = cartList.filter((product) => product.id === id)[0].quantity;

    apiCall({
      type: "patch",
      url: `/api/cart-list/${id}`,
      body: {
        product: {
          quantity: prevQty - 1
        }
      }
    });
  };

  const increment = (id) => {
    const prevQty = cartList.filter((product) => product.id === id)[0].quantity;

    apiCall({
      type: "patch",
      url: `/api/cart-list/${id}`,
      body: {
        product: {
          quantity: prevQty + 1
        }
      }
    });
  };

  const isAlreadyInCart = (id) => {
    return cartList.some((product) => product.id === id);
  };

  const totalCartItems = () => {
    return cartList.length;
  };

  const totalCartPrice = () => {
    return cartList.reduce(
      (acc, { price, quantity }) => acc + price * quantity,
      0
    );
  };

  const cartItemQuantity = (id) => {
    return cartList.filter((product) => product.id === id)[0].quantity;
  };

  return {
    isLoading,
    isError,
    cartList,
    increment,
    decrement,
    isAlreadyInCart,
    totalCartItems,
    totalCartPrice,
    cartItemQuantity,
    addToCart,
    removeFromCart,
    dispatch
  };
};
