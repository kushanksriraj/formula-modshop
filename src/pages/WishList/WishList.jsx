import axios from "axios";
import { useEffect, useState } from "react";
import { ProductCard } from "../../Components";
import { useAuth, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const WishList = () => {
  const { userProfile } = useAuth();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      setLoading(true);
      const response = await axios.get(
        `${BASE_URL}/wish-list/${userProfile._id}`
      );
      setWishList(response.data.wishlist?.wishListItems || []);
      setLoading(false);
    })();
  }, [userData.wishList]);

  return (
    <div className="top-margin m-h-auto" style={{ maxWidth: "80rem" }}>
      <header className="heading-2 p-4">Your wishlist</header>

      {loading && <h2 className="pos-fix bottom-right m-4">Loading...</h2>}

      {wishList.length > 0 ? (
        <div className="product-list">
          {wishList.map((product) => {
            return <ProductCard key={product._id} product={product} />;
          })}
        </div>
      ) : (
        <>
          {!loading && (
            <div className="flex justify-center align-center font-6 color-6 text-bold h-8">
              No products in wishlist!
            </div>
          )}
        </>
      )}
    </div>
  );
};
