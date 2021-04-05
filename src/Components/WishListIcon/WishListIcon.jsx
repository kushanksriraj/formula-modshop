import { useWishList } from "../../hooks";
import styles from "./WishListIcon.module.css";
import { WishListIconSvg } from "./WishListIconSvg";

export const WishListIcon = () => {
  const { totalItemsInWishList } = useWishList();

  return (
    <div>
      <div className="icon">
        <WishListIconSvg />
        <div className="badge-icon font-sm border-round center-item">
          <div>{totalItemsInWishList()}</div>
        </div>
      </div>
    </div>
  );
};
