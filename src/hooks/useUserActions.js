import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "./useAuth";
import { useUserData } from "./useUserData";
import { BASE_URL } from "../utils/utils";

export const useUserActions = (setLoading) => {
  const navigate = useNavigate();
  const { userData, userDispatch } = useUserData();
  const { userProfile, isUserLoggedIn } = useAuth();

  const addToWishList = async (_id, path) => {
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
        from: path,
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

  const addToCartOnClick = async (_id, path) => {
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
        from: path,
        message: "Login to add to cart.",
        addTo: "CART",
        productId: _id,
      },
    });
  };

  const isAlreadyInCart = (_id) =>
    userData.cartList.some(({ product }) => product === _id);

  const decrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`,
        {
          quantity: quantity - 1,
        }
      );

      if (res.data.success) {
        userDispatch({
          type: "DECREMENT_CART",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }
  };

  const incrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`,
        {
          quantity: quantity + 1,
        }
      );

      if (res.data.success) {
        userDispatch({
          type: "INCREMENT_CART",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }
  };

  const removeFromCartOnClick = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.delete(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`
      );

      if (res.data.success) {
        userDispatch({
          type: "REMOVE_FROM_CART",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }
  };

  return {
    addToWishList,
    addToCartOnClick,
    isAlreadyInCart,
    isAlreadyInWishList,
    removeFromWishList,
    incrementQuantity,
    decrementQuantity,
    removeFromCartOnClick,
  };
};
