import styles from "./SortButton.module.css";
import { useControl } from "../../hooks";

export const SortButton = () => {
  const {
     sortBy, 
     sortLowToHigh, 
     sortHighToLow, 
     clearSort
   } = useControl();

  return (
    <div className={styles.sortCard}>
      <div className={styles.title}>Sort by</div>
      <div className={styles.section}>
        <label htmlFor="low-to-high">
          <input
            type="radio"
            name="sort"
            id="low-to-high"
            onChange={sortLowToHigh}
            checked={sortBy === "LOW_TO_HIGH"}
          />
          Low to high
        </label>
      </div>

      <div className={styles.section}>
        <label htmlFor="high-to-low">
          <input
            type="radio"
            name="sort"
            id="high-to-low"
            onChange={sortHighToLow}
            checked={sortBy === "HIGH_TO_LOW"}
          />
          High to low
        </label>
      </div>

      <button
        onClick={clearSort}
        className={`btn font-md btn-secondary ${styles.clearBtn}`}
      >
        Clear
      </button>
    </div>
  );
};
