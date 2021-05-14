import { useState } from "react";
import { useLocation } from "react-router";
import { useUserActions } from "../../hooks";

export const ToggleWishList = ({ _id }) => {
  const [loading, setLoading] = useState(false);
  const location = useLocation();
  const path = location.pathname + location.search;
  const { addToWishList, removeFromWishList, isAlreadyInWishList } =
    useUserActions(setLoading);

  return (
    <div>
      {isAlreadyInWishList(_id) ? (
        <button
          disabled={loading}
          onClick={() => removeFromWishList(_id)}
          className="bg-color-2 border-1 border-round flex justify-center align-center p-1"
        >
          <span className="material-icons-outlined color-3">favorite</span>
        </button>
      ) : (
        <button
          disabled={loading}
          onClick={() => addToWishList(_id, path)}
          className="bg-color-2 border-1 border-round flex justify-center align-center p-1"
        >
          <span className="material-icons-outlined color-1">favorite</span>
        </button>
      )}
    </div>
  );
};
