import { useNavigate } from "react-router-dom";

export const ProductCard = ({ product }) => {

    const navigate = useNavigate();

  return (
    <div 
    onClick={() => navigate(`/product/${product._id}`)}
    className="w-5 h-7 border-1 m-2 p-2 box-shadow flex flex-col cur-point">
      <div className="w-100 m-1">
        <img
          className="img-responsive"
          src={product.imageUrl}
          alt={product.name}
        />
      </div>
      <div className="text-bold m-v-2 m-h-1 flex-grow">{product.name}</div>
      <div className="text-bold">₹{product.price}</div>
    </div>
  );
};
