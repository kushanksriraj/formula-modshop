import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, ProductCardHorizontal } from "../../Components";
import { useAuth, useScrollToTop, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";
import { CheckoutBox } from "./CheckoutBox";

export const Cart = () => {
  const { userProfile } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useScrollToTop();

  useEffect(() => {
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
          <div className="flex justify-center cart-mobile">
            <div className="m-2">
              {cartList.map((product) => {
                return (
                  <ProductCardHorizontal
                    key={product._id}
                    product={product}
                    loading={loading}
                  />
                );
              })}
            </div>
            <CheckoutBox cartList={cartList} />
          </div>
        )}

        {!loading && isCartEmpty && (
          <div className="flex place-center font-6 color-6 text-bold h-8">
            No products in cart!
          </div>
        )}
      </div>
    </>
  );
};
