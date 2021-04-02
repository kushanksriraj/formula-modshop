import styles from "./ProductCard.module.css";
import { WishListButton, CartModifyButtons } from "../";

import { useControl } from "../../hooks";

export const ProductCard = ({ productId, image, name, price, renderedIn }) => {
  const { selectProductOnClick } = useControl();

  return (
    <div className={styles.productCard}>
      <div
        className={styles.image}
        onClick={() => selectProductOnClick(productId)}
      >
        <img className="img-responsive" src={image} alt="" />
      </div>

      <div>
        <div
          className={styles.title}
          onClick={() => selectProductOnClick(productId)}
        >
          {name}
        </div>

        <div className={styles.price}>₹{price}</div>
      </div>

      <div className={styles.wishListBtn}>
        <WishListButton productId={productId} />
      </div>
      {renderedIn === "cart" && <CartModifyButtons productId={productId} />}
    </div>
  );
};
