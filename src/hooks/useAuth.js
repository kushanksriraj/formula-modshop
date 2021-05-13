import { AuthContext } from "../contexts";
import { useContext } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router";
import { useUserData } from "./useUserData";

export const useAuth = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    userProfile,
    loading,
    setLoading,
  } = useContext(AuthContext);

  const navigate = useNavigate();
  const { userDispatch } = useUserData();

  const logUserIn = async (email, password, redirectPath, addTo, productId) => {
    const response = await axios.post(`${BASE_URL}/user`, {
      user: {
        email,
        password,
      },
    });
    if (response.data.success) {
      if (addTo) {
        switch (addTo) {
          case "CART":
            {
              const user = await axios.get(
                `${BASE_URL}/user-data/${response.data.user._id}`
              );
              if (
                user.data.cartList?.some(({ product }) => product === productId)
              ) {
                break;
              }
              await axios.post(`${BASE_URL}/cart/${response.data.user._id}`, {
                product: {
                  _id: productId,
                },
              });
            }
            break;

          case "WISHLIST":
            {
              const user = await axios.get(
                `${BASE_URL}/user-data/${response.data.user._id}`
              );

              if (
                user.data.wishList?.some((product) => product === productId)
              ) {
                break;
              }
              await axios.post(
                `${BASE_URL}/wish-list/${response.data.user._id}`,
                {
                  product: {
                    _id: productId,
                  },
                }
              );
            }
            break;

          default:
            break;
        }
      }

      setIsUserLoggedIn(true);
      setUserData(response.data.user);
      console.log({ redirectPath });
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
    return false;
  };

  const signUpUser = async (name, email, password, path, addTo, productId) => {
    const response = await axios.post(`${BASE_URL}/user/new`, {
      user: {
        name,
        email,
        password,
      },
    });
    if (response.data.success) {
      if (addTo) {
        switch (addTo) {
          case "CART":
            {
              await axios.post(`${BASE_URL}/cart/${response.data.user._id}`, {
                product: {
                  _id: productId,
                },
              });
            }
            break;

          case "WISHLIST":
            {
              await axios.post(
                `${BASE_URL}/wish-list/${response.data.user._id}`,
                {
                  product: {
                    _id: productId,
                  },
                }
              );
            }
            break;

          default:
            break;
        }
      }
      setIsUserLoggedIn(true);
      setUserData(response.data.user);
      if (path) {
        navigate(path, { replace: true });
        return;
      }
      navigate("/", { replace: true });
      return;
    }
    return false;
  };

  const logUserOut = () => {
    setIsUserLoggedIn(false);
    userDispatch({
      type: "FLUSH_DATA",
    });
    setUserData({});
    navigate("/");
  };

  return {
    isUserLoggedIn,
    logUserIn,
    logUserOut,
    signUpUser,
    userProfile,
    setIsUserLoggedIn,
    setUserData,
    loading,
    setLoading,
  };
};
