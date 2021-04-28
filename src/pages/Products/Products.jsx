import axios from "axios";
import { useEffect } from "react";
import { useProductData } from "../../hooks";
import { BASE_URL } from "../../utils/utils";
import { ProductCard } from "../../Components";
import { useSearchParams, useLocation, useNavigate } from "react-router-dom";

export const Products = () => {
  const { productList, setProductList } = useProductData();
  const [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation();
  const navigate = useNavigate();
  const filterBy = searchParams.get("filter");
  const sortBy = searchParams.get("sort");

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/products`);
      setProductList(response.data.products);
    })();
  }, []);

  const getFilteredData = (productList, filterBy) => {
    if (filterBy) {
      return productList.filter((product) => product.category === filterBy);
    }
    return productList;
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
    <div className="">
      <h2>This is products page.</h2>

      <button onClick={() => setSortOnClick("LOW_TO_HIGH")}>
        Sort low to high
      </button>
      <button onClick={() => setSortOnClick("HIGH_TO_LOW")}>
        Sort high to low
      </button>
      <button onClick={clearSortOnClick}>Clear sort</button>

      <h4>Filter</h4>
      <button onClick={clearFilterOnClick}>Clear Filter</button>
      <button onClick={() => setFilterOnClick("Caps")}>Caps</button>
      <button onClick={() => setFilterOnClick("Hoodie")}>Hoodie</button>
      <button onClick={() => setFilterOnClick("T-Shirt")}>T-Shirt</button>
      <button onClick={() => setFilterOnClick("Model car")}>Model car</button>
      <button onClick={() => setFilterOnClick("Backpack")}>Backpack</button>
      <button onClick={() => setFilterOnClick("Keyring")}>Keyring</button>
      <button onClick={() => setFilterOnClick("iPhone case")}>
        iPhone case
      </button>

      <div className="flex justify-center wrap w-100 p-8">
        {sortedProductList.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}
      </div>
    </div>
  );
};
