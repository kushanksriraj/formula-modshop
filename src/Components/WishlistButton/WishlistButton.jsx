import { useWishlist } from "./useWishlist";

export const WishlistButton = ({ id }) => {
  const {
    isAlreadyInWishlist,
    addToWishlist,
    removeFromWishlist
  } = useWishlist();

  return (
    <>
      {isAlreadyInWishlist(id) ? (
        <button onClick={() => removeFromWishlist(id)}>
          Remove from wishlist
        </button>
      ) : (
        <button onClick={() => addToWishlist(id)}>Add to wishlist</button>
      )}
    </>
  );
};
