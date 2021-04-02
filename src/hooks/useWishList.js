import { WishListContext } from "../contexts";
import { useContext, useEffect } from "react";
import { useProduct } from "../hooks";
import { useAxios } from "../hooks/useAxios";

export const useWishList = () => {
  const {
    state: { wishList },
    dispatch
  } = useContext(WishListContext);

  const { productList } = useProduct();

  const { apiCall, response, isError, isLoading } = useAxios();

  useEffect(() => {
    if (response) {
      switch (response.config.method) {
        case "post":
          if (response.status === 201) {
            dispatch({
              type: "ADD_TO_WISHLIST",
              payload: {
                product: response.data.wishList
              }
            });
          }
          break;

        case "delete":
          if (response.status === 200) {
            dispatch({
              type: "REMOVE_FROM_WISHLIST",
              payload: {
                productId: response.data
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

  const totalItemsInWishList = () => {
    return wishList.length;
  };

  const addToWishList = (productId) => {
    const product = productList.filter((product) => product.productId === productId)[0];

    const {id, ...productNoId} = product;

    apiCall({
      type: "post",
      url: "/api/wish-list",
      body: {
        product: { ...productNoId }
      }
    });
  };

  const removeFromWishList = (productId) => {
    apiCall({
      type: "delete",
      url: `/api/wish-list/${productId}`
    });
  };

  const isAlreadyInWishList = (productId) => {
    return wishList.some((product) => product.productId === productId);
  };

  return {
    wishList,
    isLoading,
    isError,
    addToWishList,
    removeFromWishList,
    dispatch,
    totalItemsInWishList,
    isAlreadyInWishList
  };
};
