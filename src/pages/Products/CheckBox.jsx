export const CheckBox = ({ isChecked, label, callback }) => {
  return (
    <>
      <input
        type="checkbox"
        className="cur-point"
        id={label}
        onChange={callback}
        checked={isChecked}
      />
      <label htmlFor={label} className="cur-point m-h-1">
        {label}
      </label>
    </>
  );
};
