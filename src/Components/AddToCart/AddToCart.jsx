import axios from "axios";
import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const AddToCart = ({ _id, inStock }) => {
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
        from: location.pathname + location.search,
        message: "Login to add to cart.",
        addTo: "CART",
        productId: _id,
      },
    });
  };

  const isAlreadyInCart = (_id) =>
    userData.cartList.some(({ product }) => product === _id);

  return (
    <>
      {isAlreadyInCart(_id) ? (
        <button
          onClick={() => navigate("/cart")}
          className="btn bg-color-1 color-2 text-bold font-4 p-3 w-100 m-h-2"
        >
          GO TO CART
        </button>
      ) : (
        <button
          disabled={loading || !inStock}
          onClick={() => addToCartOnClick(_id)}
          className="btn bg-color-3 color-2 text-bold font-4 p-3 w-100 m-h-2"
        >
          ADD TO CART
        </button>
      )}
    </>
  );
};
