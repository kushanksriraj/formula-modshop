import axios from "axios";
import { useEffect } from "react";
import { useProductData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";
import { ProductCard } from "../../Components";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";
import { MobileFilters } from "./MobileFilters";

export const Products = () => {
  const { productList, setProductList } = useProductData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filterBy = searchParams.get("filter");
  const sortBy = searchParams.get("sort");

  useEffect(() => {
    window.scrollTo(0, 0);
    (async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      setProductList(response.data.products);
    })();
  }, []);

  const getFilteredData = (productList, filterBy) => {
    switch (filterBy) {
      case "Assured delivery":
        return productList.filter((product) => product.assuredDelivery);

      case "Out of stock":
        return productList.filter((product) => product.stock === 0);

      default:
        if (filterBy) {
          return productList.filter((product) => product.category === filterBy);
        }
        return productList;
    }
  };

  const getSortedData = (filteredData, sortBy) => {
    switch (sortBy) {
      case "LOW_TO_HIGH":
        return [...filteredData].sort((a, b) => a.price - b.price);
      case "HIGH_TO_LOW":
        return [...filteredData].sort((a, b) => b.price - a.price);
      default:
        return filteredData;
    }
  };

  const setFilterOnClick = (filterBy) => {
    if (!sortBy) {
      return setSearchParams({ filter: filterBy });
    }
    setSearchParams({ sort: sortBy, filter: filterBy });
  };

  const setSortOnClick = (sortBy) => {
    if (!filterBy) {
      return setSearchParams({ sort: sortBy });
    }
    setSearchParams({ filter: filterBy, sort: sortBy });
  };

  const clearFilterOnClick = () => {
    if (!sortBy) {
      return navigate(location.pathname);
    }
    setSearchParams({ sort: sortBy });
  };

  const clearSortOnClick = () => {
    if (!filterBy) {
      return navigate(location.pathname);
    }
    setSearchParams({ filter: filterBy });
  };

  const filteredData = getFilteredData(productList, filterBy);
  const sortedProductList = getSortedData(filteredData, sortBy);

  return (
    <div className="productWrapper">
      <div className="option-box">
        <div style={{ marginRight: "4rem" }}>
          <span className="text-bold m-h-2">Sort by</span>
          <select
            className="text-bold bg-color-1 color-2 p-1 border-round-small"
            onChange={(e) =>
              e.target.value === "RELEVANCE"
                ? clearSortOnClick()
                : setSortOnClick(e.target.value)
            }
          >
            <option value="RELEVANCE">Relevance</option>
            <option value="LOW_TO_HIGH">Low to high</option>
            <option value="HIGH_TO_LOW">High to low</option>
          </select>
        </div>

        <div>
          <div className="text-bold m-v-3 m-h-2">Filter</div>
          <div className="m-h-2 m-v-3 border-1 h-5 w-5">
            <div className="flex wrap">
              <div className="m-1">
                <input
                  type="checkbox"
                  id="assured-delivery"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Assured delivery")
                  }
                  checked={filterBy === "Assured delivery"}
                />
                <label htmlFor="assured-delivery" className="cur-point m-h-1">
                  Assured delivery
                </label>
              </div>
              <div className="m-1">
                <input
                  type="checkbox"
                  id="out-of-stock"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Out of stock")
                  }
                  checked={filterBy === "Out of stock"}
                />
                <label htmlFor="out-of-stock" className="cur-point m-h-1">
                  Out of stock
                </label>
              </div>
            </div>

            <div className="separator" />
            <div className="text-bold m-1 font-3">Filter by type</div>
            <div className="flex wrap">
              <div className="m-2">
                <input
                  type="checkbox"
                  id="caps"
                  onChange={(e) => e.target.checked && setFilterOnClick("Caps")}
                  checked={filterBy === "Caps"}
                />
                <label htmlFor="caps" className="cur-point m-h-1">
                  Caps
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="hoodie"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Hoodie")
                  }
                  checked={filterBy === "Hoodie"}
                />
                <label htmlFor="hoodie" className="cur-point m-h-1">
                  Hoodie
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="t-shirt"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("T-Shirt")
                  }
                  checked={filterBy === "T-Shirt"}
                />
                <label htmlFor="t-shirt" className="cur-point m-h-1">
                  T-Shirt
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="model-car"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Model car")
                  }
                  checked={filterBy === "Model car"}
                />
                <label htmlFor="model-car" className="cur-point m-h-1">
                  Model car
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="backpack"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Backpack")
                  }
                  checked={filterBy === "Backpack"}
                />
                <label htmlFor="backpack" className="cur-point m-h-1">
                  Backpack
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="keyring"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("Keyring")
                  }
                  checked={filterBy === "Keyring"}
                />
                <label htmlFor="keyring" className="cur-point m-h-1">
                  Keyring
                </label>
              </div>
              <div className="m-2">
                <input
                  type="checkbox"
                  id="iphone-case"
                  onChange={(e) =>
                    e.target.checked && setFilterOnClick("iPhone case")
                  }
                  checked={filterBy === "iPhone case"}
                />
                <label htmlFor="iphone-case" className="cur-point m-h-1">
                  iPhone case
                </label>
              </div>
            </div>
          </div>
          <button
            onClick={clearFilterOnClick}
            className="btn btn-small bg-color-1 color-2 text-bold p-h-2 border-round-small m-h-2"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <MobileFilters
        filterBy={filterBy}
        clearFilterOnClick={clearFilterOnClick}
        clearSortOnClick={clearSortOnClick}
        setFilterOnClick={setFilterOnClick}
        setSortOnClick={setSortOnClick}
      />
      <div className="product-list">
        {sortedProductList.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};
