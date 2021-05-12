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
import { useAuthPersist } from "./hooks/useAuthPersist";

export default function App() {
  useAuthPersist();

  return (
    <div className="App">
      <Navbar />
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
