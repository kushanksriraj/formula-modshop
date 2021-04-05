import { useCart } from "../../hooks";
import { CartIconSvg } from "./CartIconSvg";

export const CartIcon = () => {
  const { totalCartItems } = useCart();

  return (
    <div>
      <div className="icon">
        <CartIconSvg />
        <div className="badge-icon font-sm border-round center-item">
          <div>{totalCartItems()}</div>
        </div>
      </div>
    </div>
  );
};
