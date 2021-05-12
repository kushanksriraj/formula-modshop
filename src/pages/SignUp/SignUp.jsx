import { useState } from "react";
import { useAuth, useScrollToTop } from "../../hooks";
import { useLocation, Navigate } from "react-router-dom";
import { Loading } from "../../Components";

const SignUpBox = () => {
  const { signUpUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);
  const location = useLocation();

  const path = location.state?.from;
  const addTo = location.state?.addTo;
  const productId = location.state?.productId;

  const isPasswordMatched =
    confirmPassword !== "" && confirmPassword === password;

  const checkUserInput = name !== "" && email !== "" && isPasswordMatched;

  const isPasswordValid = /^(?=.*[0-9])(?=.*[a-z])(?=.*[A-Z]).{8,32}$/.test(
    password
  );

  const signUpHandler = async (e) => {
    setSignUpError("");
    setLoading(true);
    e.preventDefault();
    if (checkUserInput) {
      if (!isPasswordValid) {
        setSignUpError(
          "Password must be 8 characters long, have one upper and lower case character and one number."
        );
        setLoading(false);
        return;
      }
      const res = await signUpUser(
        name,
        email,
        password,
        path,
        addTo,
        productId
      );
      !res && setSignUpError("Error signing up! Try again.");
      setLoading(false);
      return;
    }
    setSignUpError("All fields are required!");
    setLoading(false);
  };

  return (
    <div className="top-margin flex justify-center h-100">
      <div className="box-shadow w-8 h-fit flex flex-col align-center top-margin">
        <div className="text-bold font-6 p-v-3">Sign up</div>

        <div className="flex flex-col align-center w-100 p-2">
          <form onSubmit={signUpHandler} className="w-100 p-h-6">
            <div className="m-v-2">
              <label
                className="input-label p-v-2 text-bold color-1 font-4"
                htmlFor="input-id-name"
              >
                Name
              </label>
              <input
                type="text"
                value={name}
                id="input-id-name"
                placeholder="Enter your name"
                onChange={(e) => setName(e.target.value)}
                className="input border-round-small border-1 color-1 p-2 font-3 w-100"
              />
            </div>
            <div className="m-v-2">
              <label
                className="input-label p-v-2 text-bold color-1 font-4"
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
            <div className="pos-rel m-v-2">
              <label
                className="input-label p-v-2 text-bold color-1 font-4"
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
              <div
                className="pos-abs top-right m-v-8 p-v-4 p-h-3 cur-point"
                onClick={() => setShowPass((prev) => !prev)}
              >
                <span className="material-icons-outlined font-5">
                  {showPass ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            <div className="m-v-2">
              <label
                className="input-label p-v-2 text-bold color-1 font-4"
                htmlFor="input-id-password-confirm"
              >
                Confirm password
              </label>
              <input
                type="password"
                id="input-id-password-confirm"
                value={confirmPassword}
                placeholder="Enter the same password"
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="input border-round-small border-1 color-1 p-2 font-3 w-100"
              />

              <div className="error-prompt font-3 m-h-1 m-v-2 h-fit text-bold color-3">
                {confirmPassword !== "" && !isPasswordMatched
                  ? "Both passwords must match!"
                  : signUpError}
              </div>
            </div>

            <div className="flex flex-end m-v-3">
              <button
                type="submit"
                disabled={confirmPassword !== "" && !isPasswordMatched}
                className="btn btn-md p-h-8 p-v-3 font-4"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};

export const SignUp = () => {
  const { isUserLoggedIn } = useAuth();
  const location = useLocation();
  useScrollToTop();
  const path = location.state?.from;
  return (
    <>
      {!isUserLoggedIn ? (
        <SignUpBox />
      ) : (
        <Navigate to={path ? path : "/profile"} />
      )}
    </>
  );
};

// Check for server error when user tries to sign in using the same Email.
