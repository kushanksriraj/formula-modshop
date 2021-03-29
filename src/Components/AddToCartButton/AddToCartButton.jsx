import { useAddToCart } from "./useAddToCart";
import styles from "./AddToCartButton.module.css";
import { useProduct, useRoute } from "../Helper/context";

export const AddToCartButton = ({ id }) => {
  const { addToCart, isAlreadyInCart } = useAddToCart();
  const { dispatch } = useRoute();
  const {
    state: { productList }
  } = useProduct();

  const isInStock = (id) => {
    return productList.filter((product) => product.id === id)[0].inStock;
  };

  return (
    <>
      {isAlreadyInCart(id) ? (
        <button
          className={styles.addToCartBtn}
          onClick={() =>
            dispatch({
              type: "CHANGE_ROUTE",
              payload: {
                route: "cart"
              }
            })
          }
        >
          Go to cart
        </button>
      ) : isInStock(id) ? (
        <button onClick={() => addToCart(id)} className={styles.addToCartBtn}>
          Add to cart
        </button>
      ) : (
        "Out of stock!"
      )}
    </>
  );
};
