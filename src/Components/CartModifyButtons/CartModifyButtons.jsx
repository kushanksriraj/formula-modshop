import { useCart } from "../../hooks";
import styles from "./CartModifyButtons.module.css";
import { ToastMsg } from "../";
import { MinusSvg } from "./MinusSvg";
import { DeleteSvg } from "./DeleteSvg";
import { PlusSvg } from "./PlusSvg";

export const CartModifyButtons = ({ _id }) => {
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
          cartItemQuantity(_id) > 1
            ? decrement(_id)
            : removeFromCart(_id);
        }}
      >
        <div className="icon" style={{ width: `18px` }}>
          {cartItemQuantity(_id) > 1 ? (
            <MinusSvg />
          ) : (
            <DeleteSvg />
          )}
        </div>
      </button>
      <div className={styles.itemQty}>{cartItemQuantity(_id)}</div>

      <button
        className={`btn-icon ${styles.incrementBtn}`}
        onClick={() => increment(_id)}
      >
        <div className="icon" style={{ width: `20px` }}>
          <PlusSvg />
        </div>
      </button>
      {isLoading && <ToastMsg msg={"Updating quantity..."} />}
    </div>
  );
};
