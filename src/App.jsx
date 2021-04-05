import "./styles.css";
import { useEffect, useState } from "react";
import { useAxios, useProduct } from "./hooks";
import { Navbar } from "./Components";
import { Products, Cart, WishList, Checkout, ProductPage } from "./Routes";
import { Routes, Route, useNavigate } from "react-router-dom";

export default function App() {
  const { setProductList } = useProduct();
  const { apiCall, response, isLoading } = useAxios();
  const [search, setSearch] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    apiCall({
      type: "get",
      url: "/api/product-list"
    });
    navigate("/products");
  }, []);

  useEffect(() => {
    if (response && response.status === 200) {
      setProductList(response.data.productLists);
    }
  }, [response]);

  return (
    <div className="App">
      <Navbar search={search} setSearch={setSearch} />

      <Routes>
        <Route
          path="/products"
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
