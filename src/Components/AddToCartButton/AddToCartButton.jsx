import styles from "./AddToCartButton.module.css";
import { useProduct, useCart, useControl } from "../../hooks";
import { ToastMsg } from "../";

export const AddToCartButton = ({ productId }) => {
  const { isLoading, addToCart, isAlreadyInCart } = useCart();
  const { isInStock } = useProduct();
  const { changeRouteOnClick } = useControl();

  return (
    <>
      {isAlreadyInCart(productId) ? (
        <button
          className={`btn font-md btn-secondary ${styles.btnMd}`}
          onClick={() => changeRouteOnClick("cart")}
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
