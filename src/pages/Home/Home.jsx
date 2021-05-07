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
    <div className="top-margin">
      <header className="m-v-2 font-5 text-center h-2 bg-color-7 flex flex-col align-center justify-center">
        Grab you favorite <span className="font-6 text-bold">FORMULA 1</span>
        merchandise!
      </header>

      <div>
        <img
          className="img-responsive"
          src="/image/car-hero.jpg"
          style={{ height: "100%" }}
          alt=""
        />
      </div>

      <section className="flex wrap">
        <article
          onClick={() => navigateOnClick("Caps")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          Caps
        </article>
        <article
          onClick={() => navigateOnClick("Hoodie")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          Hoodie
        </article>
        <article
          onClick={() => navigateOnClick("T-Shirt")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          T-Shirt
        </article>
        <article
          onClick={() => navigateOnClick("Model+car")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          Model car
        </article>
        <article
          onClick={() => navigateOnClick("Backpack")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          Backpack
        </article>
        <article
          onClick={() => navigateOnClick("Keyring")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          Keyring
        </article>
        <article
          onClick={() => navigateOnClick("iPhone+case")}
          className="m-2 cur-point w-4 h-4 bg-color-1 color-2 text-bold font-6 flex flex-grow justify-center align-center"
        >
          iPhone case
        </article>
      </section>
    </div>
  );
};
