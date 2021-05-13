import axios from "axios";
import { useEffect, useState } from "react";
import { useProductData, useQueryParams, useScrollToTop } from "../../hooks";
import {
  BASE_URL,
  categoryList,
  getTransformedProducts,
} from "../../utils/utils";
import { Loading, ProductCard } from "../../Components";
import { useSearchParams } from "react-router-dom";
import { MobileFilters } from "./MobileFilters";
import { SortBox } from "./SortBox";
import { CheckBox } from "./CheckBox";

export const Products = () => {
  const { productList, setProductList } = useProductData();
  const [searchParams] = useSearchParams();
  const [loading, setLoading] = useState(false);

  const {
    deleteSearchParamList,
    replaceSearchParams,
    setCheckBoxCatergory,
    setCheckBoxFilter,
  } = useQueryParams(searchParams);

  useScrollToTop();

  useEffect(() => {
    (async () => {
      setLoading(true);
      const response = await axios.get(`${BASE_URL}/products`);
      setProductList(response.data.products);
      setLoading(false);
    })();
  }, []);

  const categoryFilterList = searchParams.getAll("category");
  const sort = searchParams.get("sort") || "";
  const stockFilter = searchParams.get("stock") || "";
  const deliveryFilter = searchParams.get("delivery") || "";

  const transFormedProductList = getTransformedProducts({
    productList,
    categoryFilterList,
    stockFilter,
    deliveryFilter,
    sort,
  });

  return (
    <div className="productWrapper">
      <div className="option-box">
        <div className="right-margin">
          <span className="text-bold m-h-2">Sort by</span>
          <SortBox
            sort={sort}
            deleteSearchParamList={deleteSearchParamList}
            replaceSearchParams={replaceSearchParams}
          />
        </div>

        <div>
          <div className="text-bold m-v-3 m-h-2">Filter</div>
          <div className="m-h-2 m-v-3 border-1 h-5 w-5">
            <div className="flex wrap">
              <div className="m-1">
                <CheckBox
                  isChecked={deliveryFilter === "ASSURED_DELIVERY"}
                  label="Assured delivery"
                  callback={(e) =>
                    setCheckBoxFilter(e, "delivery", "ASSURED_DELIVERY")
                  }
                />
              </div>
              <div className="m-1">
                <CheckBox
                  isChecked={stockFilter === "OUT_OF_STOCK"}
                  label="Include out of stock"
                  callback={(e) =>
                    setCheckBoxFilter(e, "stock", "OUT_OF_STOCK")
                  }
                />
              </div>
            </div>

            <div className="separator" />
            <div className="text-bold m-1 font-3">Filter by type</div>
            <div className="flex wrap">
              {categoryList.map(({ name }) => {
                return (
                  <div key={name} className="m-2">
                    <CheckBox
                      isChecked={categoryFilterList.some(
                        (list) => list === name
                      )}
                      label={name}
                      callback={(e) =>
                        setCheckBoxCatergory(e, "category", name)
                      }
                    />
                  </div>
                );
              })}
            </div>
          </div>
          <button
            onClick={() => {
              deleteSearchParamList({ name: "category" });
              deleteSearchParamList({ name: "stock" });
              deleteSearchParamList({ name: "delivery" });
            }}
            className="btn btn-small bg-color-1 color-2 text-bold p-h-2 border-round-small m-h-2"
          >
            Clear Filter
          </button>
        </div>
      </div>

      <MobileFilters
        categoryFilterList={categoryFilterList}
        sort={sort}
        stockFilter={stockFilter}
        deliveryFilter={deliveryFilter}
        searchParams={searchParams}
      />

      <div className="product-list pos-rel">
        {transFormedProductList.map((product) => {
          return <ProductCard key={product._id} product={product} />;
        })}

        {transFormedProductList.length === 0 && !loading && (
          <div className="pos-abs flex place-center text-bold font-6 color-6 m-8 p-8 prompt-mobile">
            No matching products found!
          </div>
        )}
      </div>

      {loading && <Loading />}
    </div>
  );
};
