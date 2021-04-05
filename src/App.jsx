import "./styles.css";
import { Home, Cart, WishList, Checkout } from "./Routes";
import { useControl, useProduct } from "./hooks";
import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";
import { Navbar } from "./Components";
import { Routes, Route} from "react-router-dom";

export default function App() {
  const { route } = useControl();
  const { setProductList } = useProduct();
  const { apiCall, response, isLoading } = useAxios();
  const [search, setSearch] = useState("");

  useEffect(() => {
    apiCall({
      type: "get",
      url: "/api/product-list"
    });
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
          path="/"
          element={<Home search={search} isLoading={isLoading} />}
        />
        <Route path="cart" element={<Cart />} />
        <Route path="wishlist" element={<WishList />} />
        <Route path="checkout" element={<Checkout />} />
      </Routes>

      {/* {route === "home" && <Home search={search} isLoading={isLoading} />} */}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <WishList />}
      {route === "checkout" && <Checkout />}

   
    </div>
  );
}
