import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import { useUserActions } from "../../hooks";
import { Loading } from "../../Components";

export const ProductInfo = () => {
  const [product, setProduct] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    addToCartOnClick,
    addToWishList,
    isAlreadyInCart,
    isAlreadyInWishList,
    removeFromWishList,
  } = useUserActions(setLoading);

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data.product);
      setLoading(false);
    })();
  }, []);

  const inStock = product?.stock > 0;

  return (
    <div className="top-margin h-100 flex place-center">
      <div className="flex border-1 product-detail-wrapper">
        <div className="product-img-wrapper p-6">
          <img
            className="img-responsive"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="flex-col p-4">
          <div className="heading-2"> {product.name}</div>
          <div className="m-v-8 m-h-4">
            Discounted price:
            <span className="text-bold font-5"> ₹{product.price}</span>
          </div>

          {!inStock && <div className="m-4 text-bold">Out of stock!</div>}
          <div className="flex space-around w-7 m-v-4">
            {isAlreadyInWishList(product._id) ? (
              <button
                className="btn btn-md p-3 color-3 text-bold"
                onClick={() => removeFromWishList(product._id)}
              >
                REMOVE FROM WISHLIST
              </button>
            ) : (
              <button
                className="btn btn-md p-3 text-bold"
                onClick={() => addToWishList(product._id)}
              >
                ADD TO WISHLIST
              </button>
            )}

            {isAlreadyInCart(product._id) ? (
              <button
                onClick={() => navigate("/cart")}
                className="btn btn-md p-3 bg-color-1 color-2 text-bold"
              >
                GO TO CART
              </button>
            ) : (
              <button
                onClick={() => addToCartOnClick(product._id)}
                disabled={!inStock}
                className="btn btn-md p-3 bg-color-3 color-2 text-bold"
              >
                ADD TO CART
              </button>
            )}
          </div>

          <div className="heading-3 product-description">Description</div>
          <div className="p-4 font-5">{product.description}</div>
        </div>
      </div>
      {loading && <Loading />}
    </div>
  );
};
