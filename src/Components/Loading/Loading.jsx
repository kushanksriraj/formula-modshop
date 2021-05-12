export const Loading = () => {
  return (
    <div className="pos-fix h-100 w-100 flex justify-center align-center bg-color-8 text-bold font-6 color-1 z-md">
      <span
        className="material-icons-round spin color-1"
        style={{ fontSize: "7rem" }}
      >
        loop
      </span>
    </div>
  );
};
