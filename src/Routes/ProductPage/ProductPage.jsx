import styles from "./ProductPage.module.css";
import { useProduct } from "../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { WishListButton, AddToCartButton } from "../../Components";

export const ProductPage = () => {
  const { getSelectedProduct, isInStock } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();

  const { image, name, price } = getSelectedProduct(productId);

  return (
    <div className={styles.modal}>
      <button
        onClick={() => navigate(-1)}
        className="btn font-md btn-secondary"
      >
        Back
      </button>
      <div className={styles.wrapper}>
        <div className={styles.imgWrapper}>
          <img src={image} alt={name} />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.name}>{name}</div>
          <div className={styles.price}>₹{price}</div>

          <div className={styles.wishListButton}>
            <WishListButton productId={productId} />
          </div>

          {isInStock(productId) ? (
            <AddToCartButton productId={productId} />
          ) : (
            "Out of stock!"
          )}
        </div>
      </div>
    </div>
  );
};
