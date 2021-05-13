import { Navigate, useLocation } from "react-router";
import { useAuth, useScrollToTop } from "../../hooks";
import { LoginBox } from "./LoginBox";

export const Login = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();
  useScrollToTop();

  const path = location.state?.from;

  return (
    <>
      {!isUserLoggedIn ? (
        <LoginBox location={location} />
      ) : (
        <Navigate to={path ? path : "/profile"} />
      )}
    </>
  );
};
