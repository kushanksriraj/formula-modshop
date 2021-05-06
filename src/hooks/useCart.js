import { CartContext } from "../contexts/";
import { useContext, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";

export const useCart = () => {
  const {
    state: { cartList },
    dispatch,
  } = useContext(CartContext);

  const { apiCall, response, isError, isLoading } = useAxios();

  useEffect(() => {
    if (response) {
      switch (response.config.method) {
        case "post":
          if (response.status === 201) {
            dispatch({
              type: "ADD_TO_CART",
              payload: {
                product: response.data.cartlist,
              },
            });
          } else if (response.status === 200) {
            dispatch({
              type: "MODIFY_CART_QTY",
              payload: {
                productId: response.data.updated._id,
                quantity: response.data.updated.quantity,
              },
            });
          }
          break;

        case "delete":
          if (response.status === 200) {
            dispatch({
              type: "REMOVE_FROM_CART",
              payload: {
                productId: response.data.deleted.product,
              },
            });
          }

          break;

        case "get":
          break;

        default:
          break;
      }
    }
  }, [response]);

  const addToCart = (_id) => {
    apiCall({
      type: "post",
      url: "https://modshop.kushanksriraj.repl.co/cart/",
      body: {
        _id,
      },
    });
  };

  const removeFromCart = (_id) => {
    apiCall({
      type: "delete",
      url: `https://modshop.kushanksriraj.repl.co/cart/${_id}`,
    });
  };

  const decrement = (_id) => {
    const prevQty = cartList.find((product) => product.product === _id)
      .quantity;

    apiCall({
      type: "post",
      url: `https://modshop.kushanksriraj.repl.co/cart/${_id}`,
      body: {
        quantity: prevQty - 1,
      },
    });
  };

  const increment = (_id) => {
    const prevQty = cartList.find((product) => product.product === _id)
      .quantity;

    apiCall({
      type: "post",
      url: `https://modshop.kushanksriraj.repl.co/cart/${_id}`,
      body: {
        quantity: prevQty + 1,
      },
    });
  };

  const isAlreadyInCart = (_id) => {
    return cartList.some((product) => product.product === _id);
  };

  const totalCartItems = () => {
    return cartList.length;
  };

  const totalCartPrice = (list) => {
    return list.reduce(
      (acc, { product, quantity }) => acc + product.price * quantity,
      0
    );
  };

  const cartItemQuantity = (_id) => {
    console.log({ cartList });
    console.log({ _id });
    return cartList.find((product) => product.product === _id)?.quantity;
  };

  const initializeCart = (list) => {
    dispatch({
      type: "INITIALIZE",
      payload: {
        list,
      },
    });
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
    dispatch,
    initializeCart,
  };
};
