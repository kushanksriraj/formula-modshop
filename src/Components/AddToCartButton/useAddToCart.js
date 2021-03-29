import { useProduct } from "../Helper/context";

export const useAddToCart = () => {
  const { state, dispatch } = useProduct();

  const addToCart = (id) => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: id
      }
    });
  };

  const isAlreadyInCart = (id) => {
    return state.cart.filter((product) => product.id === id).length > 0;
  };

  return { addToCart, isAlreadyInCart };
};
