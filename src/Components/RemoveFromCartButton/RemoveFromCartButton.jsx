import { useCart } from "../../Routes/Cart/useCart";

export const RemoveFromCartButton = ({ id }) => {
  const { dispatch } = useCart();

  const removeFromCart = (id) => {
    dispatch({
      type: "REMOVE_FROM_CART",
      payload: {
        id
      }
    });
  }

  return (
    <>
      <button onClick={() => removeFromCart(id)}>
        Remove from cart
      </button>
    </>
  );
};
