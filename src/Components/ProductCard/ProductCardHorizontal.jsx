import { useUserActions } from "../../hooks";
import { useState } from "react";

export const ProductCardHorizontal = ({ product }) => {
  const [loading, setLoading] = useState(false);
  const {
    decrementQuantity,
    incrementQuantity,
    removeFromCartOnClick,
    isAlreadyInWishList,
    addToWishList,
  } = useUserActions(setLoading);

  const moveToWishListOnClick = () => {
    if (!isAlreadyInWishList(product.product._id)) {
      addToWishList(product.product._id);
    }
    removeFromCartOnClick(product.product._id);
  };

  return (
    <div className="box-shadow flex align-center pos-rel product-card-h m-v-2">
      <div className="h-4 w-5 p-2 flex-col align-center space-around">
        <img
          className="img-responsive w-auto"
          src={product.product.imageUrl}
          alt={product.product.name}
        />
        <button
          disabled={loading}
          onClick={moveToWishListOnClick}
          className="btn bg-color-2 font-3 p-v-2 p-h-3"
        >
          Move to wishlist
        </button>
      </div>

      <div className="flex flex-col w-100">
        <div className="product-name-h m-h-2">{product.product.name}</div>
        <div className="text-bold m-v-4 p-h-7 flex-grow">
          ₹{product.product.price}
        </div>

        <div className="flex space-even m-v-2">
          <div>Quantity: </div>
          <button
            disabled={product.quantity === 1 || loading}
            className="btn bg-inherit icon"
            onClick={() =>
              decrementQuantity(product.product._id, product.quantity)
            }
          >
            <span className="material-icons-round">remove</span>
          </button>
          <div className="font-4">{product.quantity}</div>
          <button
            disabled={loading}
            onClick={() =>
              incrementQuantity(product.product._id, product.quantity)
            }
            className="btn bg-inherit icon"
          >
            <span className="material-icons-round">add</span>
          </button>
        </div>

        <div className="pos-abs top-right">
          <button
            disabled={loading}
            className="btn bg-inherit pos-abs top-right m-2 icon"
            onClick={() => removeFromCartOnClick(product.product._id)}
          >
            <span className="material-icons-round font-7 color-1">
              highlight_off
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};
