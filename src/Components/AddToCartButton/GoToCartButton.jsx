import styles from "./AddToCartButton.module.css";
import { useNavigate } from "react-router-dom";

export const GoToCartButton = () => {
  const navigate = useNavigate();

  return (
    <button
      className={`btn font-md btn-secondary ${styles.btnMd}`}
      onClick={() => navigate("/cart")}
    >
      Go to cart
    </button>
  );
};
