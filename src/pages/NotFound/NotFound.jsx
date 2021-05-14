import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <div className="top-margin h-100  flex-col place-center font-7 text-bold color-6">
      <div>Page not found!</div>
      <div className="m-v-8 font-5">
        Go to{" "}
        <NavLink to="/" className="color-1" replace>
          Home
        </NavLink>{" "}
        page.
      </div>
    </div>
  );
};
