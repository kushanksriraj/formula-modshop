export const CategoryLink = ({ name, image, navigateOnClick }) => {
  return (
    <article
      onClick={() => navigateOnClick(name)}
      className="m-2 cur-point w-4 h-4 bg-color-1 flex flex-grow place-center pos-rel hov overflow-hide"
    >
      <img className="img-responsive blur" src={image} alt="" />
      <div className="pos-abs color-2 text-bold font-6">{name}</div>
    </article>
  );
};
