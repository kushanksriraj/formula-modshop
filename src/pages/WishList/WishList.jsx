import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../../Components";
import { useAuth } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const WishList = () => {
  const { userData } = useAuth();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/wish-list/${userData._id}`);
      setWishList(response.data.wishlist?.wishListItems || []);
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <h2>This is Wishlist</h2>
      {loading ? (
        <h2>Loading...</h2>
      ) : wishList.length > 0 ? (
        wishList.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })
      ) : (
        <h2> No products in wishlist!</h2>
      )}
    </div>
  );
};
