import { useCart } from "./useCart";
import styles from "./Cart.module.css";
import { CartModifyButtons } from "../../Components/CartModifyButtons/CartModifyButtons";
import { WishlistButton } from "../../Components/WishlistButton/WishlistButton";
import { RemoveFromCartButton } from "../../Components/RemoveFromCartButton/RemoveFromCartButton";
import { CartTotal } from "../../Components/CartTotal/CartTotal";
import { useRoute } from "../../Components/Helper/context";

export const Cart = () => {
  const { dispatch } = useRoute();
  const { totalCartItems, cartItems } = useCart();

  return (
    <div>
      <h4>My cart : {totalCartItems}</h4>
      {cartItems.map((product) => {
        return (
          <div key={product.id} className={styles.productCard}>
            <div
              onClick={() =>
                dispatch({
                  type: "CHANGE_ROUTE_ON_SELECT",
                  payload: {
                    route: "product",
                    id: product.id
                  }
                })
              }
            >
              <div className={styles.image}>
                <img src={product.image} alt="" />
              </div>
              <div className={styles.name}>{product.name}</div>
            </div>

            <div className={styles.price}>₹{product.price}</div>
            <WishlistButton id={product.id} />
            <CartModifyButtons id={product.id} />
            <RemoveFromCartButton id={product.id} />
          </div>
        );
      })}
      <CartTotal />
      {totalCartItems > 0 && <button onClick={() => dispatch({
                  type: "CHANGE_ROUTE_ON_SELECT",
                  payload: {
                    route: "checkout"
                  }
                })}>Checkout</button>}
    </div>
  );
};
