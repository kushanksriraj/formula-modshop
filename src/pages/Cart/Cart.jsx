import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCardHorizontal } from "../../Components";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

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

  const isCartNotEmpty = cartList.length > 0;

  return (
    <div className="top-margin m-h-auto h-100 max-width-md">
      <header className="heading-2 p-8">Your cart</header>

      {loading && <h2 className="pos-fix bottom-right m-4">Loading...</h2>}

      {isCartNotEmpty && (
        <div className="flex justify-center cart-list-mobile">
          <div className="cart-list">
            {cartList.map((product) => {
              return (
                <ProductCardHorizontal key={product._id} product={product} />
              );
            })}
          </div>

          <div className="checkout h-8 p-4">
            <div className="heading-2">Checkout</div>
            <div className="w-8 h-5 bg-color-2 border-1"></div>
          </div>
        </div>
      )}

      {!loading && !isCartNotEmpty && (
        <div className="flex justify-center align-center font-6 color-6 text-bold h-8">
          No products in cart!
        </div>
      )}
    </div>
  );
};
