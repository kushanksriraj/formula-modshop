import { useRoute } from "../../Components/Helper/context";
import { useProduct } from "../../Components/Helper/context";

export const ProductPage = () => {
  const { dispatch } = useRoute();
  const { state } = useProduct();

  const id = state.selectedProductId;
  const product = state.productList.filter((product) => product.id === id)[0];

  return (
    <div>
      <button
        onClick={() =>
          dispatch({
            type: "CHANGE_ROUTE",
            payload: {
              route: "home"
            }
          })
        }
      >
        {"<- Back"}
      </button>
       
      <h4>{product.name}</h4>
      <img src={product.image} alt="" />
    </div>
  );
};
