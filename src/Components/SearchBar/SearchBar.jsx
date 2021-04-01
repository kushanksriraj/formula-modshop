import styles from "./SearchBar.module.css";

export const SearchBar = ({ search, setSearch }) => {
  return (
    <div role="search" className={styles.search}>
      <input
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="textbox"
        placeholder="Start typing to search"
      />
    </div>
  );
};
