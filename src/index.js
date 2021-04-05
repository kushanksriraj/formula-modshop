import { StrictMode } from "react";
import ReactDOM from "react-dom";
import {
  ControlProvider,
  ProductProvider,
  CartProvider,
  WishListProvider
} from "./contexts";

import { BrowserRouter } from "react-router-dom";

import mockServer from "./api/mock.server";

import App from "./App";

mockServer();

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ControlProvider>
      <ProductProvider>
        <CartProvider>
          <WishListProvider>
            <App />
          </WishListProvider>
        </CartProvider>
      </ProductProvider>
    </ControlProvider>
  </StrictMode>,
  rootElement
);
