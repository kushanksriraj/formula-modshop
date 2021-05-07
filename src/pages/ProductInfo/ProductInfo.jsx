import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";
import { useUserData, useAuth } from "../../hooks";
import { Loading } from "../../Components";

export const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const { userData, userDispatch } = useUserData();
  const { userProfile, isUserLoggedIn } = useAuth();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data.product);
      setLoading(false);
    })();
  }, []);

  const addToWishList = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/wish-list/${userProfile._id}`, {
        product: {
          _id,
        },
      });

      if (res.data.success) {
        userDispatch({
          type: "ADD_TO_WISHLIST",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }
    navigate("/login", {
      state: {
        message: "Login to add to wishlist.",
        addTo: "WISHLIST",
        productId: _id,
      },
    });
  };

  const isAlreadyInWishList = (_id) =>
    userData.wishList.some((product) => product === _id);

  const removeFromWishList = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.delete(
        `${BASE_URL}/wish-list/${userProfile._id}/${_id}`
      );

      if (res.data.success) {
        userDispatch({
          type: "REMOVE_FROM_WISHLIST",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
    }
  };

  const addToCartOnClick = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      setLoading(true);
      const res = await axios.post(`${BASE_URL}/cart/${userProfile._id}`, {
        product: {
          _id,
        },
      });

      if (res.data.success) {
        userDispatch({
          type: "ADD_TO_CART",
          payload: {
            product: _id,
          },
        });
      }
      setLoading(false);
      return;
    }

    navigate("/login", {
      state: {
        message: "Login to add to cart.",
        addTo: "CART",
        productId: _id,
      },
    });
  };

  const isAlreadyInCart = (_id) =>
    userData.cartList.some(({ product }) => product === _id);

  return (
    <div className="top-margin h-100 flex justify-center align-center">
      <div className="flex border-1 product-detail-wrapper">
        <div className="product-img-wrapper p-6">
          <img
            className="img-responsive"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <div className="flex flex-col p-4">
          <div className="heading-2"> {product.name}</div>
          <div className="m-v-8 m-h-4">
            Discounted price:
            <span className="text-bold font-5"> ₹{product.price}</span>
          </div>
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
