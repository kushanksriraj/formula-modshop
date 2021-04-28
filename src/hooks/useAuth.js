import { AuthContext } from "../contexts";
import { useContext, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/utils";
import { useNavigate } from "react-router";

export const useAuth = () => {
  const {
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    userData,
  } = useContext(AuthContext);

  const navigate = useNavigate();

  useEffect(() => {
    (async () => {
      await localStorage.setItem("login", isUserLoggedIn);
    })();
  }, [isUserLoggedIn]);

  const logUserIn = async (email, password, redirectPath) => {
    const response = await axios.post(`${BASE_URL}/user`, {
      user: {
        email,
        password,
      },
    });
    if (response.data.success) {
      setIsUserLoggedIn(true);
      setUserData(response.data.user);
      if (redirectPath) {
        navigate(redirectPath, { replace: true });
        return;
      }
      navigate("/", { replace: true });
    }
  };

  const signUpUser = async (name, email, password) => {
    const response = await axios.post(`${BASE_URL}/user/new`, {
      user: {
        name,
        email,
        password,
      },
    });
    if (response.data.success) {
      setIsUserLoggedIn(true);
      setUserData(response.data.user);
      navigate("/", { replace: true });
    }
  };

  const logUserOut = () => {
    setIsUserLoggedIn(false);
    setUserData({});
  };

  return { isUserLoggedIn, logUserIn, logUserOut, signUpUser, userData };
};
