import { useProduct } from "../Helper/context";

export const SortButton = () => {
  const {
    state: { sortBy },
    dispatch
  } = useProduct();

  const sortLowToHigh = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "LOW_TO_HIGH"
      }
    });
  };
  const sortHighToLow = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "HIGH_TO_LOW"
      }
    });
  };

  const clearSort = () => {
    dispatch({
      type: "SORT",
      payload: {
        type: "DEFAULT"
      }
    });
  };

  return (
    <div>
      <h3>Sort</h3>

      <label htmlFor="sort-low-to-high">
        <input
          type="radio"
          name="sort"
          id="sort-low-to-high"
          onChange={sortLowToHigh}
          checked={sortBy === "LOW_TO_HIGH"}
        />
        Low to high
      </label>

      <label htmlFor="sort-high-to-low">
        <input
          type="radio"
          name="sort"
          id="sort-high-to-low"
          onChange={sortHighToLow}
          checked={sortBy === "HIGH_TO_LOW"}
        />
        High to low
      </label>

      <button onClick={clearSort}> Clear</button>
    </div>
  );
};
