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

import { PrivateRoute, Navbar } from "./Components";
import { Routes, Route } from "react-router-dom";
import { useAuth, useUserData } from "./hooks";
import { useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "./utils/utils";

export default function App() {
  const {
    userProfile,
    isUserLoggedIn,
    setIsUserLoggedIn,
    setUserData,
    setLoading,
  } = useAuth();
  const { userDispatch } = useUserData();

  useEffect(() => {
    if (isUserLoggedIn && userProfile?._id) {
      (async () => {
        const res = await axios.get(`${BASE_URL}/user-data/${userProfile._id}`);

        if (res.data.success) {
          userDispatch({
            type: "INITIALIZE_CART",
            payload: {
              cartList: res.data.cartList,
            },
          });
          userDispatch({
            type: "INITIALIZE_WISHLIST",
            payload: {
              wishList: res.data.wishList,
            },
          });
        }
      })();
    }
  }, [userProfile]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const login = await JSON.parse(localStorage.getItem("login"));
      const user = await JSON.parse(localStorage.getItem("user"));
      if (login !== undefined && user !== undefined) {
        setIsUserLoggedIn(login);
        setUserData(user);
      }
      setLoading(false);
    })();
  }, []);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await localStorage.setItem("login", isUserLoggedIn);
      await localStorage.setItem("user", JSON.stringify(userProfile));
      setLoading(false);
    })();
  }, [isUserLoggedIn, userProfile]);

  return (
    <div className="App">
      <Navbar />
      {/* Sidebar */}

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
