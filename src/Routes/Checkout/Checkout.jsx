import { CartTotal } from "../../Components";
import { useControl, useCart } from "../../hooks";

export const Checkout = () => {
  const { changeRouteOnClick } = useControl();
  const { cartList } = useCart();

  return (
    <div>
      <button onClick={() => changeRouteOnClick("cart")}>{"<- Back"}</button>

      <h4>Checkout:</h4>
      {cartList.map(({ id, name, price, quantity }) => {
        return (
          <div key={id}>
            <h4>Name: {name}</h4>
            <h4>Price: {price}</h4>
            <h4>Quantity: {quantity}</h4>
          </div>
        );
      })}
      <CartTotal />
    </div>
  );
};
