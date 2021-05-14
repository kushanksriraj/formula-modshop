export const InputBox = ({ label, placeholder, value, type, callback }) => {
  return (
    <>
      <label
        className="input-label m-v-2 text-bold color-1 font-4"
        htmlFor={label}
      >
        {label}
      </label>
      <input
        type={type}
        value={value}
        id={label}
        placeholder={placeholder}
        onChange={callback}
        className="input border-round-small border-1 color-1 p-2 font-3 w-100"
      />
    </>
  );
};
