import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useAuth } from "../../hooks";

export const Login = () => {
  const { isUserLoggedIn, logUserIn, logUserOut } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const location = useLocation();
  const navigate = useNavigate();

  const path = location.state?.from;

  return (
    <div>
      <h2>This is login page</h2>

      {path && (
        <h1>
          Login to continue to {path.slice(1)[0].toUpperCase() + path.slice(2)}
        </h1>
      )}

      {!isUserLoggedIn ? (
        <div>
          <label>
            Email
            <input
              value={email}
              type="text"
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <label>
            Password
            <input
              value={password}
              type="text"
              onChange={(e) => setPassword(e.target.value)}
            />
          </label>
          <button
            onClick={() => logUserIn(email, password, location.state?.from)}
          >
            Login
          </button>
        </div>
      ) : (
        <button onClick={logUserOut}>Log out</button>
      )}
      <button
        onClick={() =>
          navigate("/sign-up", {
            state: {
              from: location.state?.from,
            },
            replace: true,
          })
        }
      >
        Sign up
      </button>
    </div>
  );
};
