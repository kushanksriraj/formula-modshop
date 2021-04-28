import { useNavigate } from "react-router-dom";

export const Home = () => {
  const navigate = useNavigate();

  const navigateOnClick = (filterBy) => {
    navigate({
      pathname: "/products",
      search: `?filter=${filterBy}`,
    });
  };

  return (
    <div className="m-4 border-1 box-shadow text-center flex align-center justify-center">
      <h2>This is home</h2>
      <button onClick={() => navigateOnClick("Caps")}>Caps</button>
      <button onClick={() => navigateOnClick("Hoodie")}>Hoodie</button>
      <button onClick={() => navigateOnClick("T-Shirt")}>T-Shirt</button>
      <button onClick={() => navigateOnClick("Model+car")}>Model car</button>
      <button onClick={() => navigateOnClick("Backpack")}>Backpack</button>
      <button onClick={() => navigateOnClick("Keyring")}>Keyring</button>
      <button onClick={() => navigateOnClick("iPhone+case")}>
        iPhone case
      </button>
    </div>
  );
};
