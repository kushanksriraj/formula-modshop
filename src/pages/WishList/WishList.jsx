import axios from "axios";
import { useEffect, useState } from "react";
import { Loading, ProductCard } from "../../Components";
import { useAuth, useScrollToTop, useUserData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";

export const WishList = () => {
  const { userProfile } = useAuth();
  const [wishList, setWishList] = useState([]);
  const [loading, setLoading] = useState(false);
  const { userData } = useUserData();
  useScrollToTop();

  useEffect(() => {
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
    <>
      {loading && <Loading />}
      <div className="top-margin m-h-auto max-width-md">
        <header className="heading-2 p-t-8 m-2">Your wishlist</header>
        {wishList.length > 0 ? (
          <div className="product-list">
            {wishList.map((product) => {
              return <ProductCard key={product._id} product={product} />;
            })}
          </div>
        ) : (
          <>
            {!loading && (
              <div className="flex place-center font-6 color-6 text-bold h-8">
                No products in wishlist!
              </div>
            )}
          </>
        )}
      </div>
    </>
  );
};
