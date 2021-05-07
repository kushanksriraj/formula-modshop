import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const AddToCart = ({ _id }) => {
  const { userProfile, isUserLoggedIn } = useAuth();
  const { userData, userDispatch } = useUserData();
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const addToCartOnClick = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/cart/${userProfile._id}`, {
        product: {
          _id,
        },
      });

      if (res.data.success) {
        userDispatch({
          type: "ADD_TO_CART",
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
        message: "Login to add to cart.",
        addTo: "CART",
        productId: _id,
      },
    });
  };

  const isAlreadyInCart = (_id) =>
    userData.cartList.some(({ product }) => product === _id);

  return (
    <div>
      {isAlreadyInCart(_id) ? (
        <button onClick={() => navigate("/cart")}  
        className="btn btn-small bg-color-1 color-2 text-bold font-3 p-h-2 border-round-small"
        >Goto cart</button>
      ) : (
        <button
          disabled={loading}
          onClick={() => addToCartOnClick(_id)}
          className="btn btn-small bg-color-3 color-2 text-bold font-3 p-h-2 border-round-small"
        >
          Add to cart
        </button>
      )}
    </div>
  );
};
