import { useRoute } from "../../Components/Helper/context";
import { useCart } from "../../Routes/Cart/useCart";
import { CartTotal } from "../../Components/CartTotal/CartTotal";

export const Checkout = () => {
  const { dispatch } = useRoute();
  const { cartItems } = useCart();

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE",
            payload: {
              route: "cart"
            }
          })
        }
      >
        {"<- Back"}
      </button>

      <h4>Checkout:</h4>
      {cartItems.map((product) => {
        return (
          <div>
            <h4>Name: {product.name}</h4>
            <h4>Price: {product.price}</h4>
            <h4>Quantity: {product.quantity}</h4>
          </div>
        );
      })}
      <CartTotal />
    </div>
  );
};
