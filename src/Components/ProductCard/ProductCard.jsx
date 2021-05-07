import { useNavigate } from "react-router-dom";
import { AddToCart, ToggleWishList } from "../";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  return (
    <div className="box-shadow flex flex-col cur-point pos-rel product-card">
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="w-100 p-4 flex flex-col"
      >
        <div className="flex-grow">
          <img
            className="img-responsive"
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
          />
        </div>
        <div className="m-1 product-name">{product.name}</div>
      </div>
      <div className="text-bold m-h-4 flex-grow">₹{product.price}</div>

      <div
        className="flex justify-center align-center w-100 p-v-2"
      >
        <AddToCart _id={product._id} />
      </div>

      <div className="pos-abs top-right m-2">
        <ToggleWishList _id={product._id} />
      </div>
    </div>
  );
};
