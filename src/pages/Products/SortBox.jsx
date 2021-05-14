export const SortBox = ({
  sort,
  deleteSearchParamList,
  replaceSearchParams,
}) => {
  return (
    <select
      value={sort || "RELEVANCE"}
      className="text-bold bg-color-1 color-2 p-1 border-round-small"
      onChange={(e) =>
        e.target.value === "RELEVANCE"
          ? deleteSearchParamList({ name: "sort" })
          : replaceSearchParams({ name: "sort", value: e.target.value })
      }
    >
      <option value="RELEVANCE">Relevance</option>
      <option value="LOW_TO_HIGH">Low to high</option>
      <option value="HIGH_TO_LOW">High to low</option>
    </select>
  );
};
