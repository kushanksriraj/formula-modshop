import { useNavigate } from "react-router-dom";
import { categoryList } from "../../utils/utils";

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
      <header className="m-v-2 font-5 text-center h-2 bg-color-7 flex flex-col align-center justify-center">
        Grab you favorite
        <span className="font-6 text-bold">FORMULA 1</span>
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
      <div className="flex space-between">
        <div className="text-bold font-5 p-2 p-h-5">Categories</div>
        <button
          className="btn bg-inherit text-bold font-5 p-2 flex align-center justify-center"
          onClick={() => navigate("/products")}
        >
          See all
          <span className="material-icons-round p-h-2">trending_flat</span>
        </button>
      </div>

      <section className="flex wrap">
        {categoryList.map(({ name, image }, id) => {
          return (
            <article
              key={id}
              onClick={() => navigateOnClick(name)}
              className="m-2 cur-point w-4 h-4 bg-color-1 flex flex-grow justify-center align-center pos-rel hov"
              style={{ overflow: "hidden" }}
            >
              <img className="img-responsive blur" src={image} alt="" />
              <div className="pos-abs color-2 text-bold font-6">{name}</div>
            </article>
          );
        })}
      </section>
    </div>
  );
};
