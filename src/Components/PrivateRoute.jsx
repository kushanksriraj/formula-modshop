import { Navigate, Route, useLocation } from "react-router-dom";
import { useAuth } from "../hooks";

export const PrivateRoute = (props) => {
  const { isUserLoggedIn, loading } = useAuth();
  const location = useLocation();

  return (
    <>
      {loading ? (
        <span>Loading...</span>
      ) : (
        <>
          {isUserLoggedIn ? (
            <Route {...props} />
          ) : (
            <Navigate to="/login" state={{ from: location.pathname }} replace />
          )}
        </>
      )}
    </>
  );
};
