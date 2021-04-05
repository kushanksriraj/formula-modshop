import styles from "./AddToCartButton.module.css";
import { useProduct, useCart, useControl } from "../../hooks";
import { ToastMsg } from "../";
import { useNavigate } from "react-router-dom";

export const AddToCartButton = ({ productId }) => {
  const { isLoading, addToCart, isAlreadyInCart } = useCart();
  const { isInStock } = useProduct();
  // const { changeRouteOnClick } = useControl();
  const navigate = useNavigate();

  return (
    <>
      {isAlreadyInCart(productId) ? (
        <button
          className={`btn font-md btn-secondary ${styles.btnMd}`}
          onClick={() => navigate("/cart")}
        >
          Go to cart
        </button>
      ) : isInStock(productId) ? (
        <button
          onClick={() => addToCart(productId)}
          className={`btn font-md btn-primary ${styles.btnBig}`}
          disabled={isLoading ? true : false}
        >
          Add to cart
        </button>
      ) : (
        "Out of stock!"
      )}
      {isLoading && <ToastMsg msg={"Adding to cart..."} />}
    </>
  );
};
