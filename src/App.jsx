import "./styles.css";
import { Home, Cart, WishList, Checkout } from "./Routes";
import { useControl, useProduct } from "./hooks";
import { useEffect, useState } from "react";
import { useAxios } from "./hooks/useAxios";
import { Navbar } from "./Components";

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
      {route === "home" && <Home search={search} isLoading={isLoading} />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <WishList />}
      {route === "checkout" && <Checkout />}
    </div>
  );
}
