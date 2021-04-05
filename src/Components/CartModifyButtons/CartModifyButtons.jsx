import { useCart } from "../../hooks";
import styles from "./CartModifyButtons.module.css";
import { ToastMsg } from "../";
import { MinusSvg } from "./MinusSvg";
import { DeleteSvg } from "./DeleteSvg";
import { PlusSvg } from "./PlusSvg";

export const CartModifyButtons = ({ productId }) => {
  const {
    isLoading,
    decrement,
    increment,
    cartItemQuantity,
    removeFromCart
  } = useCart();

  return (
    <div className={styles.cartModifyBtnsWrapper}>
      <button
        className={`btn-icon ${styles.decrementBtn}`}
        onClick={() => {
          cartItemQuantity(productId) > 1
            ? decrement(productId)
            : removeFromCart(productId);
        }}
      >
        <div className="icon" style={{ width: `18px` }}>
          {cartItemQuantity(productId) > 1 ? (
            <MinusSvg />
          ) : (
            <DeleteSvg />
          )}
        </div>
      </button>
      <div className={styles.itemQty}>{cartItemQuantity(productId)}</div>

      <button
        className={`btn-icon ${styles.incrementBtn}`}
        onClick={() => increment(productId)}
      >
        <div className="icon" style={{ width: `20px` }}>
          <PlusSvg />
        </div>
      </button>
      {isLoading && <ToastMsg msg={"Updating quantity..."} />}
    </div>
  );
};
