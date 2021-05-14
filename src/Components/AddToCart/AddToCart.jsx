import { useState } from "react";
import { useLocation, useNavigate } from "react-router";
import { useUserActions } from "../../hooks";

export const AddToCart = ({ _id, inStock }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const path = location.pathname + location.search;

  const { addToCartOnClick, isAlreadyInCart } = useUserActions(setLoading);

  return (
    <>
      {isAlreadyInCart(_id) ? (
        <button
          onClick={() => navigate("/cart")}
          className="btn bg-color-1 color-2 text-bold font-3 p-2 w-100"
        >
          GO TO CART
        </button>
      ) : (
        <button
          disabled={loading || !inStock}
          onClick={() => addToCartOnClick(_id, path)}
          className="btn bg-color-3 color-2 text-bold font-3 p-2 w-100"
        >
          ADD TO CART
        </button>
      )}
    </>
  );
};
