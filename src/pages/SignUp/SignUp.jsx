import { useState, useEffect } from "react";
import { useAuth } from "../../hooks";

export const SignUp = () => {
  const { isUserLoggedIn, signUpUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="top-margin">
      <h2>This is Sign up page</h2>

      <h2>Sign up</h2>
      {!isUserLoggedIn && (
        <div>
          <label>
            Name
            <input
              value={name}
              type="text"
              onChange={(e) => setName(e.target.value)}
            />
          </label>
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
          <button onClick={() => signUpUser(name, email, password)}>
            Sign up
          </button>
        </div>
      )}
    </div>
  );
};
