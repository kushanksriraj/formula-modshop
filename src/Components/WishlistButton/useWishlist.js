import { useProduct } from "../Helper/context";

export const useWishlist = () => {
  const { state, dispatch } = useProduct();
  const wishlistLength = state.wishlist.length;

  const wishlist = [...state.wishlist];

  const addToWishlist = (id) => {
    dispatch({
      type: "ADD_TO_WISHLIST",
      payload: {
        id
      }
    });
  };

  const removeFromWishlist = (id) => {
    dispatch({
      type: "REMOVE_FROM_WISHLIST",
      payload: {
        id
      }
    });
  };

  const isAlreadyInWishlist = (id) => {
    return state.wishlist.filter((product) => product.id === id).length > 0;
  };

  return {
    wishlist,
    isAlreadyInWishlist,
    addToWishlist,
    removeFromWishlist,
    wishlistLength
  };
};
