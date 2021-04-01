import styles from "./AddToCartButton.module.css";
import { useProduct, useCart, useControl } from "../../hooks";
import { ToastMsg } from "../";

export const AddToCartButton = ({ id }) => {
  const { isLoading, addToCart, isAlreadyInCart } = useCart();
  const { isInStock } = useProduct();
  const { changeRouteOnClick } = useControl();

  return (
    <>
      {isAlreadyInCart(id) ? (
        <button
          className={`btn font-md btn-secondary ${styles.btnMd}`}
          onClick={() => changeRouteOnClick("cart")}
        >
          Go to cart
        </button>
      ) : isInStock(id) ? (
        <button
          onClick={() => addToCart(id)}
          className={`btn font-md btn-primary ${styles.btnBig}`}
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
