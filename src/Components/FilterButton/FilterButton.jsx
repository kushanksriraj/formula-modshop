import { useProduct } from "../../Components/Helper/context";

export const FilterButton = () => {
  const {
    state: { filters },
    dispatch
  } = useProduct();

  const filterOutOfStock = () => {
    dispatch({
      type: "TOGGLE_INVENTORY"
    });
  };

  const filterFastDelivery = () => {
    dispatch({
      type: "TOGGLE_DELIVERY"
    });
  };

  return (
    <>
      <div>
        <label htmlFor="out-of-stock">
          <input
            type="checkbox"
            name="filter"
            id="out-of-stock"
            onChange={filterOutOfStock}
            checked={filters.showAllInventory}
          />
          Include out of stock
        </label>
      </div>
      <div>
        <label htmlFor="fast-delivery">
          <input
            type="checkbox"
            name="filter"
            id="fast-delivery"
            onChange={filterFastDelivery}
            checked={filters.showFastDeliveryOnly}
          />
          Fast delivery only
        </label>
      </div>
    </>
  );
};
