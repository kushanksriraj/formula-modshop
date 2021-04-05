import { useEffect, useRef } from "react";
import styles from "./SearchBar.module.css";

export const SearchBar = ({ search, setSearch }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    inputRef.current.focus();
  }, []);

  return (
    <div role="search" className={styles.search}>
      <input
        ref={inputRef}
        type="text"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="textbox"
        placeholder="Start typing to search"
      />
    </div>
  );
};
