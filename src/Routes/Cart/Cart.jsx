import styles from "./Cart.module.css";
import { CartTotal, ProductCard } from "../../Components";
import { ProductPage } from "../../Routes";
import { useCart, useControl } from "../../hooks";

export const Cart = () => {
  const { isProductSelected } = useControl();
  const { totalCartItems, cartList } = useCart();

  return (
    <>
      {isProductSelected ? (
        <ProductPage />
      ) : (
        <>
          {totalCartItems() > 0 ? (
            <div>
              <div className={styles.title}>Cart : {totalCartItems()}</div>
              <div className={styles.homeWrapper}>
                {cartList.map(({ productId, image, name, price }) => {
                  return (
                    <ProductCard
                      key={productId}
                      productId={productId}
                      image={image}
                      name={name}
                      price={price}
                      renderedIn={"cart"}
                    />
                  );
                })}
                <CartTotal />
              </div>
            </div>
          ) : (
            <div className={styles.cartEmptyPrompt}>Your cart is empty!</div>
          )}
        </>
      )}
    </>
  );
};
