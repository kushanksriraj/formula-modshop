import styles from "./ProductCard.module.css";
import { WishListButton, CartModifyButtons } from "../";
import { useNavigate } from "react-router-dom";

export const ProductCard = ({ 
    productId,
    image,
    name,
    price,
    renderedIn }) => {

  const navigate = useNavigate();

  return (
    <div className={styles.productCard}>
      <div onClick={() => navigate(`/product/${productId}`)}>
        <div className={styles.image}>
          <img className="img-responsive" src={image} alt={name} />
        </div>

        <div>
          <div className={styles.title}>{name}</div>

          <div className={styles.price}>₹{price}</div>
        </div>
      </div>

      <div className={styles.wishListBtn}>
        <WishListButton productId={productId} />
      </div>
      {renderedIn === "cart" && <CartModifyButtons productId={productId} />}
    </div>
  );
};
