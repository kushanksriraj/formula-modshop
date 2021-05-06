import { useCart } from "../../hooks";
import styles from "./CartTotal.module.css";

export const CartTotal = ({list}) => {
  const { totalCartPrice } = useCart();

  return (
    <div className={styles.cartTotalWrapper}>
      Total : ₹{totalCartPrice(list)}
    </div>
  );
};
