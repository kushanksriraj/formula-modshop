import styles from "./Cart.module.css";
import { CartTotal, ProductCard, ToastMsg } from "../../Components";
import { useCart, useAxios } from "../../hooks";
import { useState, useEffect } from "react";

export const ListCartProducts = () => {
  const { totalCartItems, cartList } = useCart();
  const { apiCall, response, isLoading } = useAxios();
  const [populatedCart, setPopulatedCart] = useState([]);

  useEffect(() => {
    apiCall({
      type: "get",
      url: "https://modshop.kushanksriraj.repl.co/cart/",
    });
  }, [cartList]);

  useEffect(() => {
    console.log({ response });
    if (response && response.status === 200) {
      setPopulatedCart(response.data.cartlist);
    }
  }, [response]);

  return (
    <div>
      <div className={styles.title}>Cart : {totalCartItems()}</div>
      <div className={styles.homeWrapper}>
        <CartTotal list={populatedCart} />
        {populatedCart.map(({ product }) => (
          <ProductCard
            key={product._id}
            _id={product._id}
            imageUrl={product.imageUrl}
            name={product.name}
            price={product.price}
            renderedIn={"cart"}
          />
        ))}
      </div>
      {isLoading && <ToastMsg msg={"Loading products in cart..."} />}
    </div>
  );
};
