import styles from "./ProductPage.module.css";
import { useProduct, useAxios } from "../../hooks";
import { useParams, useNavigate } from "react-router-dom";
import { WishListButton, AddToCartButton, ToastMsg } from "../../Components";
import { useEffect, useState } from "react";

export const ProductPage = () => {
  // const { getSelectedProduct, isInStock } = useProduct();
  const { productId } = useParams();
  const navigate = useNavigate();
  const { apiCall, response, isLoading } = useAxios();
  const [productData, setProductData] = useState({});

  useEffect(() => {
    apiCall({
      type: "get",
      url: `https://modshop.kushanksriraj.repl.co/products/${productId}`,
    });
  }, []);

  useEffect(() => {
    console.log({ response });
    if (response && response.status === 200) {
      setProductData(response.data.product);
    }
  }, [response]);

  // const { image, name, price } = getSelectedProduct(productId);

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
          <img src={productData?.imageUrl} alt={productData?.name} />
        </div>

        <div className={styles.contentWrapper}>
          <div className={styles.name}>{productData?.name}</div>
          <div className={styles.price}>₹{productData?.price}</div>

          <div className={styles.wishListButton}>
            <WishListButton _id={productId} />
          </div>

          {/* {isInStock(productId) ? (
            <AddToCartButton _id={productId} />
          ) : (
            "Out of stock!"
          )} */}

          <AddToCartButton _id={productId} />
          
        </div>
      </div>
      {isLoading && <ToastMsg msg={"Loading product details..."} />}
    </div>
  );
};
