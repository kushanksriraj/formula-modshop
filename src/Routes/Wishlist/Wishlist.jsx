import { useWishlist } from "../../Components/WishlistButton/useWishlist";

import { ProductCard } from "../../Components/ProductCard/ProductCard";

export const Wishlist = () => {
  const { wishlist, wishlistLength } = useWishlist();

  return (
    <div>
      <h4>Wishlist : {wishlistLength}</h4>
      {wishlist.map((product) => {
        return (
          <ProductCard
            key={product.id}
            id={product.id}
            image={product.image}
            name={product.name}
            price={product.price}
          />
        );
      })}
    </div>
  );
};
