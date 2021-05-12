import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, ProductCardHorizontal } from "../../Components";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

const CheckoutBox = ({ cartList }) => {
  const totalPrice = (cartList) => {
    return cartList.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
  };

  return (
    <div className="checkout h-fit p-4">
      <div className="heading-2 m-v-4">Checkout</div>
      <div className="w-8 h-fit box-shadow pos-rel p-4">
        <div className="list-grid p-v-3 text-bold">
          <div>Product</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        {cartList.map((product) => {
          return (
            <div key={product._id}>
              <div className="list-grid p-v-4">
                <div className="product-name-h-2 text-left p-h-1">
                  {product.product.name}
                </div>
                <div className="">{product.quantity}x</div>
                <div className="">
                  ₹{product.product.price * product.quantity}
                </div>
              </div>

              <div className="separator" />
            </div>
          );
        })}
        {cartList.length > 0 && (
          <div className="p-v-4 p-h-3 flex flex-end m-v-1">
            <span className="p-h-4">Grand total:</span>
            <span className="text-bold">₹{totalPrice(cartList)}</span>
          </div>
        )}
        {cartList.length > 0 && (
          <div className="p-2 flex flex-end">
            <button className="btn p-v-3 p-h-6 font-4 bg-color-3 color-2 text-bold border-round-small">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export const Cart = () => {
  const { userProfile } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/cart/${userProfile._id}`);
      setCartList(response.data.cartlist?.cartItems || []);
      setLoading(false);
    })();
  }, [userData.cartList]);

  const isCartEmpty = cartList.length < 1;

  return (
    <>
      {loading && <Loading />}
      <div className="top-margin m-h-auto h-100 max-width-md">
        <header className="heading-2 p-8">Your cart</header>

        {!isCartEmpty && (
          <div className="flex justify-center cart-list-mobile">
            <div className="cart-list">
              {cartList.map((product) => {
                return (
                  <ProductCardHorizontal key={product._id} product={product} />
                );
              })}
            </div>
            <CheckoutBox cartList={cartList} />
          </div>
        )}

        {!loading && isCartEmpty && (
          <div className="flex justify-center align-center font-6 color-6 text-bold h-8">
            No products in cart!
          </div>
        )}
      </div>
    </>
  );
};
