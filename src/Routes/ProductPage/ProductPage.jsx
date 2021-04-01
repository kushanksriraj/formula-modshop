import styles from "./ProductPage.module.css";
import { useProduct, useControl } from "../../hooks";
import { WishListButton, AddToCartButton } from "../../Components";

export const ProductPage = () => {
  const { unSelectProductOnClick, selectedProductId } = useControl();
  const { getSelectedProduct } = useProduct();

  const product = getSelectedProduct(selectedProductId);

  return (
    <div className={styles.modal}>
      <button
        onClick={unSelectProductOnClick}
        className="btn font-md btn-secondary"
      >
        {"Back"}
      </button>
      <div className={styles.wrapper}>
        <div className={styles["img-wrapper"]}>
          <img src={product.image} alt="" />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.name}>{product.name}</div>
          <div className={styles.price}>₹{product.price}</div>
          <div className={styles.wishListButton}>
          <WishListButton id={selectedProductId} />
          </div>
          <AddToCartButton id={selectedProductId} />
        </div>
      </div>
    </div>
  );
};
