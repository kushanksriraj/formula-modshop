import ReactDOM from "react-dom";
import { StrictMode } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App";
import {
  ProductDataProvider,
  UserDataProvider,
  AuthProvider,
} from "./contexts";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <StrictMode>
    {/* AuthProvider : just login, logout, apicall to login and localstorage to save userId and login status */}
    {/* UserDataProvider: User name, cart, wishlist, orders, addresses, payments */}
    {/* ProductDataProvider: Product list,  */}

    <ProductDataProvider>
      <UserDataProvider>
        <AuthProvider>
          <Router>
            <App />
          </Router>
        </AuthProvider>
      </UserDataProvider>
    </ProductDataProvider>
  </StrictMode>,
  rootElement
);
