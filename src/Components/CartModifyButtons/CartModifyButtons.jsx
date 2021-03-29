import { useCart } from "../../Routes/Cart/useCart";

export const CartModifyButtons = ({ id }) => {
  const { cartItems, dispatch } = useCart();

  const decrement = (id) => {
    dispatch({
      type: "DECREMENT_CART",
      payload: {
        id
      }
    });
  };

  const increment = (id) => {
    dispatch({
      type: "INCREMENT_CART",
      payload: {
        id
      }
    });
  };

  const getTotalQuantity = (id) => {
    return cartItems.filter((product) => product.id === id)[0].quantity;
  };

  return (
    <>
      <button
        disabled={getTotalQuantity(id) > 1 ? false : true}
        onClick={() => decrement(id)}
      >
        -
      </button>
      {getTotalQuantity(id)}
      <button onClick={() => increment(id)}>+</button>
    </>
  );
};
