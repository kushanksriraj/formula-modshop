import styles from "./Cart.module.css";
import { CartTotal, ProductCard } from "../../Components";
import { useCart } from "../../hooks";

export const ListCartProducts = () => {
  const { totalCartItems, cartList } = useCart();

  return (
    <div>
      <div className={styles.title}>Cart : {totalCartItems()}</div>
      <div className={styles.homeWrapper}>
        <CartTotal />
        {cartList.map(({ productId, image, name, price }) => (
          <ProductCard
            key={productId}
            productId={productId}
            image={image}
            name={name}
            price={price}
            renderedIn={"cart"}
          />
        ))}
      </div>
    </div>
  );
};
