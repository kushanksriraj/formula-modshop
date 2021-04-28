import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../../Components";
import { useAuth } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const Cart = () => {
  const { userData } = useAuth();
  const [cartList, setCartList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/cart/${userData._id}`);
      setCartList(response.data.cartlist?.cartItems || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h2>This is cart</h2>

      {loading ? (
        <h2>Loading...</h2>
      ) : cartList.length > 0 ? (
        cartList.map(({ product }) => {
          return <ProductCard key={product._id} product={product} />;
        })
      ) : (
        <h2> No products in cart!</h2>
      )}
    </div>
  );
};
