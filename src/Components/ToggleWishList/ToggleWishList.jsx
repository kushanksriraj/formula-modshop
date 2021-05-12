import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const ToggleWishList = ({ _id }) => {
  const { userProfile, isUserLoggedIn } = useAuth();
  const { userData, userDispatch } = useUserData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addToWishList = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/wish-list/${userProfile._id}`, {
        product: {
          _id,
        },
      });

      if (res.data.success) {
        userDispatch({
          type: "ADD_TO_WISHLIST",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", {
      state: {
        from: location.pathname + location.search,
        message: "Login to add to wishlist.",
        addTo: "WISHLIST",
        productId: _id,
      },
    });
  };

  const isAlreadyInWishList = (_id) =>
    userData.wishList.some((product) => product === _id);

  const removeFromWishList = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.delete(
        `${BASE_URL}/wish-list/${userProfile._id}/${_id}`
      );

      if (res.data.success) {
        userDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
    }
  };

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
          onClick={() => addToWishList(_id)}
          className="bg-color-2 border-1 border-round flex justify-center align-center p-1"
        >
          <span className="material-icons-outlined color-1">favorite</span>
        </button>
      )}
    </div>
  );
};
