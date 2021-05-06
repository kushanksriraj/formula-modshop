import { WishListContext } from "../contexts";
import { useContext, useEffect } from "react";
import { useAxios } from "../hooks/useAxios";

export const useWishList = () => {
  const {
    state: { wishList },
    dispatch,
  } = useContext(WishListContext);

  const { apiCall, response, isError, isLoading } = useAxios();

  useEffect(() => {
    if (response) {
      switch (response.config.method) {
        case "post":
          if (response.status === 201) {
            // console.log("----****----- ", response.data.wishlist.product);
            dispatch({
              type: "ADD_TO_WISHLIST",
              payload: {
                productId: response.data.wishlist.product,
              },
            });
          }
          break;

        case "delete":
          if (response.status === 200) {
            dispatch({
              type: "REMOVE_FROM_WISHLIST",
              payload: {
                productId: response.data.deleted.product,
              },
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

  const addToWishList = (_id) => {
    apiCall({
      type: "post",
      url: "https://modshop.kushanksriraj.repl.co/wish-list/",
      body: {
        _id,
      },
    });
  };

  const removeFromWishList = (_id) => {
    apiCall({
      type: "delete",
      url: `https://modshop.kushanksriraj.repl.co/wish-list/${_id}`,
    });
  };

  const isAlreadyInWishList = (_id) => {
    // console.log({wishList});
    return wishList.some((product) => product.product === _id);
  };


  const initializeWishList = (list) => {
   dispatch({
     type: "INITIALIZE",
     payload : {
       list
     }
   });
  }

  return {
    wishList,
    isLoading,
    isError,
    addToWishList,
    removeFromWishList,
    dispatch,
    totalItemsInWishList,
    isAlreadyInWishList,
    initializeWishList
  };
};
