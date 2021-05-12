import { useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router";
import { Loading } from "../../Components";
import { useAuth, useScrollToTop } from "../../hooks";

const LoginBox = () => {
  const { logUserIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();
  const [showPass, setShowPass] = useState(false);
  const [loading, setLoading] = useState(false);
  const [loginError, setLoginError] = useState(false);

  const path = location.state?.from;
  const message = location.state?.message;
  const addTo = location.state?.addTo;
  const productId = location.state?.productId;

  const loginHandler = async (e) => {
    setLoginError(false);
    setLoading(true);
    e.preventDefault();
    const res = await logUserIn(email, password, path, addTo, productId);

    !res && setLoginError(true);
    setLoading(false);
  };

  return (
    <div className="top-margin flex justify-center h-100">
      <div className="box-shadow w-8 h-fit flex flex-col align-center top-margin p-v-4">
        <div className="text-bold font-6 p-v-2">Login</div>

        {path && !message && (
          <div className="text-bold font-4 p-v-2">
            Login to continue to{" "}
            {path.slice(1)[0].toUpperCase() + path.slice(2)}
          </div>
        )}

        {message && <h3>{message}</h3>}
        <div className="flex flex-col align-center w-100 p-2">
          <form onSubmit={loginHandler} className="w-100 p-h-6">
            <div className="">
              <label
                className="input-label m-v-2 text-bold color-1 font-4"
                htmlFor="input-id-email"
              >
                Email
              </label>
              <input
                type="email"
                value={email}
                id="input-id-email"
                placeholder="you@yourcompany.com"
                onChange={(e) => setEmail(e.target.value)}
                className="input border-round-small border-1 color-1 p-2 font-3 w-100"
              />
            </div>
            <div className="pos-rel m-v-3">
              <label
                className="input-label m-v-2 text-bold color-1 font-4"
                htmlFor="input-id-password"
              >
                Password
              </label>
              <input
                type={showPass ? "text" : "password"}
                id="input-id-password"
                value={password}
                placeholder="Your password"
                onChange={(e) => setPassword(e.target.value)}
                className="input border-round-small border-1 color-1 p-2 font-3 w-100"
              />

              <div className="error-prompt font-3 m-h-1 height-sm text-bold color-3">
                {loginError && "Invalid credentials! Try again."}
              </div>

              <div
                className="pos-abs top-right m-v-8 p-2 cur-point"
                onClick={() => setShowPass((prev) => !prev)}
              >
                <span className="material-icons-outlined font-5">
                  {showPass ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>

            <div className="pos-rel h-1 m-v-3">
              <button
                type="submit"
                className="pos-abs right btn btn-md p-h-8 p-v-3 font-4 m-h-2"
              >
                Login
              </button>
            </div>
          </form>
        </div>

        <p className="">
          Don&apos;t have an account?{" "}
          <button
            className="btn bg-inherit text-bold font-4 color-1"
            onClick={() =>
              navigate("/sign-up", {
                state: {
                  from: path,
                  addTo,
                  productId,
                },
                replace: true,
              })
            }
          >
            Sign up
          </button>
          .
        </p>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export const Login = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();
  useScrollToTop();

  const path = location.state?.from;

  return (
    <>
      {!isUserLoggedIn ? (
        <LoginBox />
      ) : (
        <Navigate to={path ? path : "/profile"} />
      )}
    </>
  );
};
