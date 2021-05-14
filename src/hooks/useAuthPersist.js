import { BASE_URL } from "../utils/utils";
import { useEffect } from "react";
import axios from "axios";
import { useAuth, useUserData } from "../hooks";

export const useAuthPersist = () => {
  const {
    userProfile,
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    setLoading,
  } = useAuth();
  const { userDispatch } = useUserData();

  useEffect(() => {
    if (isUserLoggedIn && userProfile?._id) {
      (async () => {
        const res = await axios.get(`${BASE_URL}/user-data/${userProfile._id}`);

        if (res.data.success) {
          userDispatch({
            type: "INITIALIZE_CART",
            payload: {
              cartList: res.data.cartList,
            },
          });
          userDispatch({
            type: "INITIALIZE_WISHLIST",
            payload: {
              wishList: res.data.wishList,
            },
          });
        }
      })();
    }
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const login = await JSON.parse(localStorage.getItem("login"));
      const user = await JSON.parse(localStorage.getItem("user"));
      if (login !== undefined && user !== undefined) {
        setIsUserLoggedIn(login);
        setUserData(user);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await localStorage.setItem("login", isUserLoggedIn);
      await localStorage.setItem("user", JSON.stringify(userProfile));
      setLoading(false);
    })();
  }, [isUserLoggedIn, userProfile]);
};
