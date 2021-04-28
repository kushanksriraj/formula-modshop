import "./styles.css";
import {
  Home,
  Products,
  ProductInfo,
  Login,
  SignUp,
  WishList,
  Cart,
  Profile,
  Orders,
  OrderInfo,
  Checkout,
  Addresses,
  Payments,
} from "./pages";

import { PrivateRoute } from "./Components";
import { Routes, Route, useNavigate } from "react-router-dom";
import { useAuth } from "./hooks";

export default function App() {
  const { userData, isUserLoggedIn, logUserOut } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="App">
      {/* navbar */}
      {/* Sidebar */}
      <button onClick={() => navigate("/")}>Home</button>
      <button onClick={() => navigate("/cart")}>Cart</button>
      <button onClick={() => navigate("/wishlist")}>Wishlist</button>

      {isUserLoggedIn ? (
        <button onClick={() => logUserOut()}>Log out</button>
      ) : (
        <>
          <button onClick={() => navigate("/login")}>Log in</button>
          <button onClick={() => navigate("/sign-up")}>Sign up</button>
        </>
      )}

      {userData?.name && userData.name}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<Products />} />
        <Route path="/product/:id" element={<ProductInfo />} />
        <Route path="/login" element={<Login />} />
        <Route path="/sign-up" element={<SignUp />} />

        <PrivateRoute path="/wishlist" element={<WishList />} />
        <PrivateRoute path="/cart" element={<Cart />} />
        <PrivateRoute path="/profile" element={<Profile />} />
        <PrivateRoute path="/orders" element={<Orders />} />
        <PrivateRoute path="/order/:id" element={<OrderInfo />} />
        <PrivateRoute path="/checkout" element={<Checkout />} />
        <PrivateRoute path="/addresses" element={<Addresses />} />
        <PrivateRoute path="/payments" element={<Payments />} />
      </Routes>
    </div>
  );
}
