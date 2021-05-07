import { useState } from "react";

export const MobileFilters = ({
  filterBy,
  clearSortOnClick,
  setSortOnClick,
  setFilterOnClick,
  clearFilterOnClick,
}) => {
  const [showFilter, setShowFilter] = useState(false);
  return (
    <div className="option-box-mobile pos-rel">
      <div className="tab border-1 flex space-around justify-center align-center p-2">
        <div className="text-bold">Sort by</div>

        <select
          className="text-bold bg-color-1 color-2 p-1 border-round-small"
          onChange={(e) => {
            e.target.value === "RELEVANCE"
              ? clearSortOnClick()
              : setSortOnClick(e.target.value);
          }}
        >
          <option value="RELEVANCE">Relevance</option>
          <option value="LOW_TO_HIGH">Low to high</option>
          <option value="HIGH_TO_LOW">High to low</option>
        </select>
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

          <div className="separator m-v-4" />
          <div className="text-bold m-1 m-v-2 font-3">Filter by type</div>
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
                onChange={(e) => e.target.checked && setFilterOnClick("Hoodie")}
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
          onClick={() => {
            clearFilterOnClick();
            setShowFilter(false);
          }}
          className="btn btn-small bg-color-1 color-2 text-bold p-h-2 border-round-small m-h-4"
        >
          Clear Filter
        </button>
      </div>
    </div>
  );
};
