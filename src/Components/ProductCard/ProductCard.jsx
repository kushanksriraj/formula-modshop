import styles from "./ProductCard.module.css";
import { WishListButton, CartModifyButtons, AddToCartButton } from "../";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ _id, imageUrl, name, price, renderedIn }) => {
  const navigate = useNavigate();

  return (
    <div className={styles.productCard}>
      <div onClick={() => navigate(`/product/${_id}`)}>
        <div className={styles.image}>
          <img className="img-responsive" src={imageUrl} alt={name} />
        </div>

        <div>
          <div className={styles.title}>{name}</div>
          <div className={styles.price}>₹{price}</div>
        </div>
      </div>

      <div className={styles.wishListBtn}>
        <WishListButton _id={_id} />
      </div>

      {renderedIn === "cart" ? (
        <div className={styles.cartModifyBtn}>
          <CartModifyButtons _id={_id} />
        </div>
      ) : (
        <div className={styles.addToCartBtn}>
          <AddToCartButton _id={_id} />
        </div>
      )}
    </div>
  );
};
