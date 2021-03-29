import styles from "./ProductCard.module.css";
import { AddToCartButton } from "../AddToCartButton/AddToCartButton";
import { WishlistButton } from "../WishlistButton/WishlistButton";
import { useRoute } from "../../Components/Helper/context";

export const ProductCard = ({ id, image, name, price }) => {
  const { dispatch } = useRoute();

  return (
    <div className={styles.productCard}>
      <div
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE_ON_SELECT",
            payload: {
              route: "product",
              id
            }
          })
        }
      >
        <div className={styles.image}>
          <img src={image} alt="" />
        </div>
        <div className={styles.name}>{name}</div>
      </div>
      <div className={styles.price}>₹{price}</div>
      <WishlistButton id={id} />
      <AddToCartButton id={id} />
    </div>
  );
};
