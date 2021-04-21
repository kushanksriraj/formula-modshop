import "./styles.css";
import { useEffect, useState } from "react";
import { useAxios, useCart, useProduct, useWishList } from "./hooks";
import { Navbar } from "./Components";
import { Products, Cart, WishList, Checkout, ProductPage } from "./Routes";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  const { setProductList } = useProduct();
  const { apiCall, response, isLoading } = useAxios();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();
  const { initializeWishList } = useWishList();
  const { initializeCart } = useCart();

  useEffect(() => {
    apiCall({
      type: "get",
      url: "https://modshop.kushanksriraj.repl.co/load-data",
    });
    // navigate("/products");
  }, []);

  useEffect(() => {
    console.log(response);
    if (response && response.status === 200) {
      setProductList(response.data.products);
      initializeWishList(response.data.wishlist);
      initializeCart(response.data.cartlist);
    }
  }, [response]);

  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/"
          element={<Products search={search} isLoading={isLoading} />}
        />
        <Route path="/cart" element={<Cart />} />
        <Route path="/wishlist" element={<WishList />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="product/:productId" element={<ProductPage />} />
      </Routes>
    </div>
  );
}
