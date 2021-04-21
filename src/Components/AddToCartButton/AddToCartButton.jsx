import styles from "./AddToCartButton.module.css";
import { useCart } from "../../hooks";
import { ToastMsg } from "../../Components";
import { GoToCartButton } from "./GoToCartButton";

export const AddToCartButton = ({ _id }) => {
  const { isLoading, addToCart, isAlreadyInCart } = useCart();

  return (
    <>
      {isAlreadyInCart(_id) ? (
        <GoToCartButton />
      ) : (
        <button
          className={`btn font-md btn-primary ${styles.btnBig}`}
          onClick={() => addToCart(_id)}
          disabled={isLoading}
        >
          Add to cart
        </button>
      )}
      {isLoading && <ToastMsg msg={"Adding to cart..."} />}
    </>
  );
};
