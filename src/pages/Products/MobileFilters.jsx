import { useState } from "react";
import { categoryList } from "../../utils/utils";
import { CheckBox } from "./CheckBox";
import { SortBox } from "./SortBox";

export const MobileFilters = ({
  deleteSearchParamList,
  replaceSearchParams,
  categoryFilterList,
  sort,
  stockFilter,
  deliveryFilter,
  setCheckBoxCatergory,
  setCheckBoxFilter,
}) => {
  const [showFilter, setShowFilter] = useState(false);

  return (
    <div className="option-box-mobile pos-rel">
      <div className="tab border-1 flex space-around justify-center align-center p-2">
        <div className="text-bold">Sort by</div>
        <SortBox
          sort={sort}
          deleteSearchParamList={deleteSearchParamList}
          replaceSearchParams={replaceSearchParams}
        />
      </div>

      <div
        className="tab border-1 p-4 text-center"
        onClick={() => setShowFilter(true)}
      >
        <span className="text-bold m-h-2">Filter</span>
      </div>

      <div
        className="panel pos-fix h-6 z-sm bg-color-white box-shadow p-2 p-v-5 bottom"
        style={{ display: showFilter ? "block" : "none" }}
      >
        <span
          className="material-icons-round pos-abs top-right m-4 font-8"
          onClick={() => setShowFilter(false)}
        >
          highlight_off
        </span>
        <div className="text-bold m-v-3 m-h-4">Filter</div>
        <div className="m-h-2 m-v-3 border-1">
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
                callback={(e) => setCheckBoxFilter(e, "stock", "OUT_OF_STOCK")}
              />
            </div>
          </div>

          <div className="separator m-v-4" />
          <div className="text-bold m-1 m-v-2 font-3">Filter by type</div>
          <div className="flex wrap">
            {categoryList.map(({ name }) => {
              return (
                <div key={name} className="m-2">
                  <CheckBox
                    isChecked={categoryFilterList.some((list) => list === name)}
                    label={name}
                    callback={(e) => setCheckBoxCatergory(e, "category", name)}
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
          className="btn btn-small bg-color-1 color-2 text-bold p-h-2 border-round-small m-h-4"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};
