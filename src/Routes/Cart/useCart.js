import { useProduct } from "../../Components/Helper/context";

export const useCart = () => {
  const { state, dispatch } = useProduct();

  const totalCartItems = state.cart.length;
  const cartItems = state.cart;

  return { totalCartItems, cartItems, dispatch };
};
