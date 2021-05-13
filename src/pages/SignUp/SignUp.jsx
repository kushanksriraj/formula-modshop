import { useAuth, useScrollToTop } from "../../hooks";
import { useLocation, Navigate } from "react-router-dom";
import { SignUpBox } from "./SignUpBox";

export const SignUp = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();
  useScrollToTop();
  const path = location.state?.from;
  return (
    <>
      {!isUserLoggedIn ? (
        <SignUpBox location={location} />
      ) : (
        <Navigate to={path ? path : "/profile"} />
      )}
    </>
  );
};
