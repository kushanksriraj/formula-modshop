import { useCart } from "../../hooks";

export const CartIcon = () => {
  const { totalCartItems } = useCart();

  return (
    <div>
      <div className="icon">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          dataName="Layer 1"
          viewBox="0 0 100 125"
          x="0px"
          y="0px"
        >
          <title>20</title>
          <g dataName="Group">
            <path
              dataName="Path"
              d="M41.9,65.5a9.4,9.4,0,1,0,9.2,9.3A9.2,9.2,0,0,0,41.9,65.5Z"
            />
            <path
              dataName="Path"
              d="M70.6,65.5a9.4,9.4,0,1,0,9.1,9.3A9.2,9.2,0,0,0,70.6,65.5Z"
            />
            <path
              dataName="Path"
              d="M87.7,26.3H28.4L25.8,18A3,3,0,0,0,23,15.8H9.3v6H20.7L32.6,60a2.9,2.9,0,0,0,2.8,2.1H78.7A3.1,3.1,0,0,0,81.6,60l9-29.8a3,3,0,0,0-2.9-3.9Z"
            />
          </g>
        </svg>
        <div className="badge-icon font-sm border-round center-item">
          <div>{totalCartItems()}</div>
        </div>
      </div>
    </div>
  );
};
