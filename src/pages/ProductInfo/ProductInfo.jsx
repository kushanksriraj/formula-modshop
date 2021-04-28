import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../utils/utils";

export const ProductInfo = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});

  useEffect(() => {
    (async () => {
      const response = await axios.get(`${BASE_URL}/products/${id}`);
      setProduct(response.data.product);
    })();
  }, []);

  return (
    <div>
      <h2>This is product info page.</h2>

      <div className="flex flex-col align-center">
        <h3>{product.name}</h3>
        <div className="w-8 m-4">
          <img
            className="img-responsive"
            src={product.imageUrl}
            alt={product.name}
          />
        </div>
        <span className="text-bold">₹{product.price}</span>
      </div>
    </div>
  );
};
