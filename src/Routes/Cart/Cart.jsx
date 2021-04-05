import styles from "./Cart.module.css";
import { useCart } from "../../hooks";
import { ListCartProducts } from "./ListCartProducts";

export const Cart = () => {
  const { totalCartItems } = useCart();

  return (
    <>
      {totalCartItems() < 1 ? (
        <div className={styles.cartEmptyPrompt}>Your cart is empty!</div>
      ) : (
        <ListCartProducts />
      )}
    </>
  );
};
