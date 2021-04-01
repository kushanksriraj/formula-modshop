import styles from "./FilterButton.module.css";

import { useControl } from "../../hooks";

export const FilterButton = () => {
  const { filters, filterOutOfStock, filterFastDelivery } = useControl();

  return (
    <div className={styles.filterCard}>
      <div className={styles.title}>Filter by</div>
      <div className={styles.section}>
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
      <div className={styles.section}>
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
    </div>
  );
};
