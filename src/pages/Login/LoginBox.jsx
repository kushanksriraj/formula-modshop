import { useState } from "react";
import { useNavigate } from "react-router";
import { InputBox, Loading } from "../../Components";
import { useAuth } from "../../hooks";

export const LoginBox = ({ location }) => {
  const { logUserIn } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
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
    console.log({ path });
    const res = await logUserIn(email, password, path, addTo, productId);
    !res && setLoginError(true);
    setLoading(false);
  };

  const getPathText = (path) => path.slice(1)[0].toUpperCase() + path.slice(2);

  console.log({ location });

  return (
    <div className="top-margin flex justify-center h-100">
      <div className="box-shadow w-8 h-fit flex-col align-center top-margin p-v-4">
        <div className="text-bold font-6 p-v-2">Login</div>

        {path && !message && (
          <div className="text-bold font-4 p-v-2">
            Login to continue to {getPathText(path)}
          </div>
        )}

        {message && <h3>{message}</h3>}

        <div className="flex-col align-center w-100 p-2">
          <form onSubmit={loginHandler} className="w-100 p-h-6">
            <div>
              <InputBox
                label="Email"
                type="email"
                value={email}
                placeholder="you@yourcompany.com"
                callback={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pos-rel m-v-3">
              <InputBox
                label="Password"
                type={showPass ? "text" : "password"}
                value={password}
                placeholder="Your password"
                callback={(e) => setPassword(e.target.value)}
              />
              <div className="font-3 m-h-1 height-sm text-bold color-3">
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

        <p>
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
