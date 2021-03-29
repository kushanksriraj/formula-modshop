import { useCart } from "../../Routes/Cart/useCart";

export const CartTotal = () => {
  const { cartItems } = useCart();

  const totalPrice = () => {
    return cartItems.reduce(
      (acc, product) => acc + product.quantity * product.price,
      0
    );
  };

  return <div>Total : ₹{totalPrice()}</div>;
};
