import { useNavigate } from "react-router-dom";
import { categoryList } from "../../utils/utils";
import { CategoryLink } from "./CategoryLink";

export const Home = () => {
  const navigate = useNavigate();

  const navigateOnClick = (filterBy) => {
    navigate({
      pathname: "/products",
      search: `?category=${filterBy}`,
    });
  };

  return (
    <div className="top-margin">
      <header className="m-v-2 font-5 text-center h-2 bg-color-7 flex-col place-center">
        Grab you favorite
        <span className="font-6 text-bold">FORMULA 1</span>
        merchandise!
      </header>
      <div>
        <img
          className="img-responsive h-100"
          src="/image/car-hero.jpg"
          alt=""
        />
      </div>
      <div className="flex space-between">
        <div className="text-bold font-5 p-2 p-h-5">Categories</div>
        <button
          className="btn bg-inherit text-bold font-5 p-2 flex place-center"
          onClick={() => navigate("/products")}
        >
          See all
          <span className="material-icons-round p-h-2">trending_flat</span>
        </button>
      </div>

      <section className="flex wrap">
        {categoryList.map(({ name, image }, id) => {
          return (
            <CategoryLink
              key={id}
              name={name}
              image={image}
              navigateOnClick={navigateOnClick}
            />
          );
        })}
      </section>
    </div>
  );
};
