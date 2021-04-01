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
                id: response.data
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

  const addToWishList = (id) => {
    const product = productList.filter((product) => product.id === id)[0];

    apiCall({
      type: "post",
      url: "/api/wish-list",
      body: {
        product: { ...product }
      }
    });
  };

  const removeFromWishList = (id) => {
    apiCall({
      type: "delete",
      url: `/api/wish-list/${id}`
    });
  };

  const isAlreadyInWishList = (id) => {
    return wishList.some((product) => product.id === id);
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
