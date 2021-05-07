import { useNavigate } from "react-router-dom";
import { useAuth, useUserData } from "../../hooks";

export const Navbar = () => {
  const { isUserLoggedIn, logUserOut } = useAuth();
  const navigate = useNavigate();
  const {
    userData: { wishList, cartList },
  } = useUserData();
  return (
    <div className="bg-color-1 navbar-h pos-fix top w-100 z-bg flex align-center">
      <header className="color-2 text-bold font-7 p-3 flex space-between w-100">
        <div onClick={() => navigate("/")} className="cur-point flex">
          <div>
            <span className="material-icons-round color-2 font-8">
              sports_motorsports
            </span>
          </div>
          <span className="m-h-2">ModShop</span>
        </div>
        <div className="flex align-center">
          <div className="badge-wrapper m-h-4">
            <button
              className="btn bg-inherit"
              onClick={() => navigate("/wishlist")}
            >
              <span className="material-icons-outlined color-2">favorite</span>
            </button>
            {wishList.length > 0 && (
              <div className="badge color-2 bg-color-3 flex justify-center align-center">
                {wishList.length}
              </div>
            )}
          </div>
          <div className="badge-wrapper m-h-4">
            <button
              className="btn bg-inherit"
              onClick={() => navigate("/cart")}
            >
              <span className="material-icons-round color-2">
                shopping_cart
              </span>
            </button>
            {cartList.length > 0 && (
              <div className="badge color-2 bg-color-3 flex justify-center align-center">
                {cartList.length}
              </div>
            )}
          </div>
          {isUserLoggedIn ? (
            <button
              className="btn bg-inherit p-h-2"
              onClick={() => logUserOut()}
            >
              <span className="material-icons-round color-2">logout</span>
            </button>
          ) : (
            <button
              className="btn bg-inherit p-h-2"
              onClick={() => navigate("/login")}
            >
              <span className="material-icons-round color-2">login</span>
            </button>
          )}
        </div>
      </header>
    </div>
  );
};
