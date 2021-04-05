import styles from "./ProductPage.module.css";
import { useProduct, useControl } from "../../hooks";
import { WishListButton, AddToCartButton } from "../../Components";
import { useParams, useNavigate } from "react-router-dom";
// import { useHistory } from "react-router-dom";
// import {  } from "react-router-dom";
// import history from 'history/browser';

export const ProductPage = () => {
  const { unSelectProductOnClick } = useControl();
  const { getSelectedProduct } = useProduct();
  const { productId } = useParams();
  // const  location  = useLocation();
  const navigate = useNavigate();
  // let history = createBrowserHistory();
  
  // let history = useHistory();

  // console.log(history);

  console.log(productId);

  const product = getSelectedProduct(productId);
  console.log(product);

  return (
    <div className={styles.modal}>
      <button
        onClick={() => navigate(-1)}
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
            <WishListButton productId={productId} />
          </div>
          <AddToCartButton productId={productId} />
        </div>
      </div>
    </div>
  );
};
