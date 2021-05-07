import { useState } from "react";
import { useAuth, useUserData } from "../../hooks";
import axios from "axios";
import { BASE_URL } from "../../utils/utils";

export const ProductCardHorizontal = ({ product }) => {
  const { userProfile, isUserLoggedIn } = useAuth();
  const { userData, userDispatch } = useUserData();

  const decrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile?._id) {
      const res = await axios.post(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`,
        {
          quantity: quantity - 1,
        }
      );

      if (res.data.success) {
        userDispatch({
          type: "DECREMENT_CART",
          payload: {
            product: _id,
          },
        });
      }
      return;
    }
  };

  const incrementQuantity = async (_id, quantity) => {
    if (isUserLoggedIn && userProfile?._id) {
      const res = await axios.post(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`,
        {
          quantity: quantity + 1,
        }
      );

      if (res.data.success) {
        userDispatch({
          type: "INCREMENT_CART",
          payload: {
            product: _id,
          },
        });
      }
      return;
    }
  };

  const removeFromCartOnClick = async (_id) => {
    if (isUserLoggedIn && userProfile?._id) {
      const res = await axios.delete(
        `${BASE_URL}/cart/${userProfile._id}/${_id}`
      );

      if (res.data.success) {
        userDispatch({
          type: "REMOVE_FROM_CART",
          payload: {
            product: _id,
          },
        });
      }
      return;
    }
  };

  const isAlreadyInWishList = (_id) =>
    userData.wishList.some((product) => product === _id);

  const addToWishList = async (_id) => {
    if (isUserLoggedIn && userProfile?._id && !isAlreadyInWishList(_id)) {
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

      return;
    }
  };

  return (
    <div className="box-shadow flex align-center pos-rel product-card-h">
      <div className="h-4 w-3 p-4 flex flex-col pos-rel">
        <img
          className="img-responsive"
          style={{ width: "auto" }}
          src={product.product.imageUrl}
          alt={product.product.name}
          loading="lazy"
        />
        <button
          onClick={() => {
            addToWishList(product.product._id);
            removeFromCartOnClick(product.product._id);
          }}
          className="btn btn-small bg-color-2 font-3 pos-abs bottom m-2 p-h-2 m-h-3 border-1"
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
            disabled={product.quantity === 1}
            className="btn bg-inherit"
            onClick={() =>
              decrementQuantity(product.product._id, product.quantity)
            }
          >
            <span className="material-icons-round">remove</span>
          </button>
          <div className="font-4">{product.quantity}</div>
          <button
            onClick={() =>
              incrementQuantity(product.product._id, product.quantity)
            }
            className="btn bg-inherit"
          >
            <span className="material-icons-round">add</span>
          </button>
        </div>

        <div className="pos-abs top-right">
          <button
            className="btn bg-inherit pos-abs top-right m-2"
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
