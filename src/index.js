import { StrictMode } from "react";
import ReactDOM from "react-dom";
import { ProductProvider } from "./Components/Helper/context";

import App from "./App";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    <ProductProvider>
    <App />
    </ProductProvider>
  </StrictMode>,
  rootElement
);
