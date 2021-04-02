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
                productId: response.data
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
                productId: response.data.cartList.productId,
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

  const addToCart = (productId) => {
    const product = productList.filter(
      (product) => product.productId === productId
    )[0];

    const { id, ...productNoId } = product;

    apiCall({
      type: "post",
      url: "/api/cart-list",
      body: {
        product: {
          ...productNoId,
          quantity: 1
        }
      }
    });
  };

  const removeFromCart = (productId) => {
    apiCall({
      type: "delete",
      url: `/api/cart-list/${productId}`
    });
  };

  const decrement = (productId) => {
    const prevQty = cartList.filter(
      (product) => product.productId === productId
    )[0].quantity;

    apiCall({
      type: "patch",
      url: `/api/cart-list/${productId}`,
      body: {
        product: {
          quantity: prevQty - 1
        }
      }
    });
  };

  const increment = (productId) => {
    const prevQty = cartList.filter(
      (product) => product.productId === productId
    )[0].quantity;

    apiCall({
      type: "patch",
      url: `/api/cart-list/${productId}`,
      body: {
        product: {
          quantity: prevQty + 1
        }
      }
    });
  };

  const isAlreadyInCart = (productId) => {
    return cartList.some((product) => product.productId === productId);
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

  const cartItemQuantity = (productId) => {
    return cartList.filter((product) => product.productId === productId)[0]
      .quantity;
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
