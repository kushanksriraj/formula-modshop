import { useState } from "react";
import { useAuth } from "../../hooks";
import { InputBox, Loading } from "../../Components";

export const SignUpBox = ({ location }) => {
  const { signUpUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [name, setName] = useState("");
  const [signUpError, setSignUpError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

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
        setSignUpError("PASSWORD_CHECK");
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
      !res && setSignUpError("SIGNUP_ERROR");
      setLoading(false);
      return;
    }
    setSignUpError("FIELDS_EMPTY");
    setLoading(false);
  };

  const showError = () => {
    if (confirmPassword !== "" && !isPasswordMatched) {
      return "Both passwords must match!";
    }

    switch (signUpError) {
      case "PASSWORD_CHECK":
        if (!isPasswordValid)
          return "Password must be 8 characters long, have one upper and lower case character and one number.";
        break;

      case "SIGNUP_ERROR":
        return "Error signing up! Try again.";

      case "FIELDS_EMPTY":
        return "All fields are required. Fill all fields and try again!";

      default:
        return "";
    }
  };

  return (
    <div className="top-margin flex justify-center h-100">
      <div className="box-shadow w-8 h-fit flex-col align-center top-margin">
        <div className="text-bold font-6 p-v-3">Sign up</div>

        <div className="flex-col align-center w-100 p-2">
          <form onSubmit={signUpHandler} className="w-100 p-h-6">
            <div className="m-v-2">
              <InputBox
                label="Name"
                type="text"
                value={name}
                placeholder="Enter your name"
                callback={(e) => setName(e.target.value)}
              />
            </div>
            <div className="m-v-2">
              <InputBox
                label="Email"
                type="email"
                value={email}
                placeholder="you@yourcompany.com"
                callback={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="pos-rel m-v-2">
              <InputBox
                label="Password"
                type={showPass ? "text" : "password"}
                value={password}
                placeholder="Your password"
                callback={(e) => setPassword(e.target.value)}
              />
              <div
                className="pos-abs top-right m-v-8 p-v-2 p-h-3 cur-point"
                onClick={() => setShowPass((prev) => !prev)}
              >
                <span className="material-icons-outlined font-5">
                  {showPass ? "visibility_off" : "visibility"}
                </span>
              </div>
            </div>
            <div className="m-v-2">
              <InputBox
                label="Confirm password"
                type="password"
                value={confirmPassword}
                placeholder="Enter the same password"
                callback={(e) => setConfirmPassword(e.target.value)}
              />
              <div className="font-3 m-h-1 m-v-2 h-fit text-bold color-3">
                {showError()}
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
