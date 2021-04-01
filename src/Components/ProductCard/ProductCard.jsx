import styles from "./ProductCard.module.css";
import { WishListButton, CartModifyButtons, RemoveFromCartButton } from "../";

import { useControl } from "../../hooks";

export const ProductCard = ({ id, image, name, price, renderedIn }) => {
  const { selectProductOnClick } = useControl();

  return (
    <div className={styles.productCard}>
      <div className={styles.image} onClick={() => selectProductOnClick(id)}>
        <img className="img-responsive" src={image} alt="" />
      </div>

      <div>
        <div className={styles.title} onClick={() => selectProductOnClick(id)}>
          {name}
        </div>

        <div className={styles.price}>₹{price}</div>
      </div>

      <div className={styles.wishListBtn}>
        <WishListButton id={id} />
      </div>
      {renderedIn === "cart" && <CartModifyButtons id={id} />}
    </div>
  );
};
