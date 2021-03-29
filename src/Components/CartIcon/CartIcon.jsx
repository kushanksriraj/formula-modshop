import { useProduct } from "../Helper/context";

export const CartIcon = () => {
  const { state } = useProduct();

  return <div>Cart : {state.cart.length}</div>;
};
