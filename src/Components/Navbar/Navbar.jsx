import styles from "./Navbar.module.css";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { WishListIcon, CartIcon, SearchBar } from "../../Components";
import { CutSvg } from "./CutSvg";
import { SearchSvg } from "./SearchSvg";
import { LogoIconSvg } from "./LogoIconSvg";

export const Navbar = ({ search, setSearch }) => {
  const [selectSearch, setSelectSearch] = useState(false);
  const navigate = useNavigate();

  return (
    <nav>
      <div className={styles.navigation}>
        <div className={styles.logoIconWrapper}>
          <div className="icon">
            <LogoIconSvg />
          </div>
          <div className={styles.title}>ModShop</div>
        </div>

        <div className={styles.btns}>
          <button
            className="btn-icon"
            style={{ fill: "white" }}
            onClick={() => {
              navigate("/wishlist");
            }}
          >
            <WishListIcon />
          </button>
          <button
            className="btn-icon"
            style={{ fill: "white" }}
            onClick={() => navigate("/cart")}
          >
            <CartIcon />
          </button>
        </div>
      </div>

      <div className={styles.navigationBelow}>
        <button className="btn-link" onClick={() => navigate("/")}>
          HOME
        </button>

        {selectSearch && <SearchBar search={search} setSearch={setSearch} />}

        <div className={styles.searchButtonWrapper}>
          <button
            className="btn-icon"
            style={{ fill: "white" }}
            onClick={() => {
              setSearch("");
              setSelectSearch((prev) => !prev);
            }}
          >
            {selectSearch ? (
              <div className="icon" style={{ fill: "white" }}>
                <CutSvg />
              </div>
            ) : (
              <div className="icon">
                <SearchSvg />
              </div>
            )}
          </button>
        </div>
      </div>
    </nav>
  );
};
