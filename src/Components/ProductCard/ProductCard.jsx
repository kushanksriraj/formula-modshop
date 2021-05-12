import { useNavigate } from "react-router-dom";
import { AddToCart, ToggleWishList } from "../";

export const ProductCard = ({ product }) => {
  const navigate = useNavigate();

  const inStock = product.stock > 0;

  return (
    <div className="box-shadow flex flex-col cur-point pos-rel product-card p-2">
      <div
        onClick={() => navigate(`/product/${product._id}`)}
        className="w-100 p-4 flex flex-col"
      >
        <div className="flex-grow pos-rel">
          <img
            className="img-responsive"
            style={{ filter: !inStock && "grayscale(100%)" }}
            src={product.imageUrl}
            alt={product.name}
            loading="lazy"
          />
          {!inStock && (
            <div className="pos-abs top w-100 h-100 flex justify-center align-center">
              <div className="w-100 text-center p-2 bg-color-2 text-bold color-1">
                Out of stock!
              </div>
            </div>
          )}
        </div>
        <div className="m-1 product-name">{product.name}</div>
      </div>
      <div className="text-bold m-h-4 flex-grow">₹{product.price}</div>

      <div className="flex justify-center align-center w-100">
        <AddToCart _id={product._id} inStock={inStock} />
      </div>

      <div className="pos-abs top-right m-2">
        <ToggleWishList _id={product._id} />
      </div>
    </div>
  );
};
