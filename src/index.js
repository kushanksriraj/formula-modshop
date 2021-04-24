import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  ControlProvider,
  ProductProvider,
  CartProvider,
  WishListProvider,
} from "./contexts";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ControlProvider>
      <ProductProvider>
        <CartProvider>
          <WishListProvider>
            <Router>
              <App />
            </Router>
          </WishListProvider>
        </CartProvider>
      </ProductProvider>
    </ControlProvider>
  </StrictMode>,
  rootElement
);
