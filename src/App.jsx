import "./styles.css";
import { Home, Cart, Wishlist, ProductPage, Checkout} from "./Routes";
import { useRoute } from "./Components/Helper/context";

export default function App() {
  const { route, dispatch } = useRoute();

  return (
    <div className="App">
      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE",
            payload: {
              route: "home"
            }
          })
        }
      >
        Home
      </button>
      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE",
            payload: {
              route: "cart"
            }
          })
        }
      >
        Cart
      </button>

      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE",
            payload: {
              route: "wishlist"
            }
          })
        }
      >
        Wishlist
      </button>
      {route === "home" && <Home />}
      {route === "cart" && <Cart />}
      {route === "wishlist" && <Wishlist />}
      {route ==="product" && <ProductPage />}
      {route ==="checkout" && <Checkout />}
    </div>
  );
}
