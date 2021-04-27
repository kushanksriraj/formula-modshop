import { AuthContext } from "../contexts";
import { useContext, useEffect } from "react";

export const useAuth = () => {
  const { isUserLoggedIn, setIsUserLoggedIn } = useContext(AuthContext);

  useEffect(() => {
    (async () => {
      await localStorage.setItem("login", isUserLoggedIn);
    })();
  }, [isUserLoggedIn]);

  const logUserIn = () => {
    setIsUserLoggedIn(true);
  };

  const logUserOut = () => {
    setIsUserLoggedIn(false);
  };

  return { isUserLoggedIn };
};
