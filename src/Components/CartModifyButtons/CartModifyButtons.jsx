import { useCart } from "../../hooks";
import styles from "./CartModifyButtons.module.css";
import { ToastMsg } from "../";

export const CartModifyButtons = ({ id }) => {
  const {
    isLoading,
    decrement,
    increment,
    cartItemQuantity,
    removeFromCart
  } = useCart();

  return (
    <div className={styles.cartModifyBtnsWrapper}>
      <button
        className={`btn-icon ${styles.decrementBtn}`}
        onClick={() => {
          cartItemQuantity(id) > 1 ? decrement(id) : removeFromCart(id);
        }}
      >
        <div className="icon" style={{ width: `18px` }}>
          {cartItemQuantity(id) > 1 ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              version="1.1"
              viewBox="0 0 456 143.75"
              x="0px"
              y="0px"
              fillRule="evenodd"
              clipRule="evenodd"
            >
              <g>
                <path
                  class="fil0"
                  d="M50 0l356 0c28,0 50,26 50,57 0,32 -22,58 -50,58l-356 0c-27,0 -50,-26 -50,-58 0,-31 23,-57 50,-57z"
                />
              </g>
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 125"
              version="1.1"
              x="0px"
              y="0px"
            >
              <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                <path
                  d="M85.9999779,16.2499966 L85.9999779,20.7499952 C85.9999779,21.9926355 84.9926189,22.9999945 83.7499786,22.9999945 L16.2499993,22.9999945 C15.007359,22.9999945 14,21.9926355 14,20.7499952 L14,16.2499966 C14,15.0073562 15.007359,13.9999972 16.2499993,13.9999972 L36.4999931,13.9999972 L36.4999931,9.49999862 C36.4999931,7.01471801 38.5147111,5 40.9999917,5 L58.9999862,5 C61.4852668,5 63.4999848,7.01471801 63.4999848,9.49999862 L63.4999848,13.9999972 L83.7499786,13.9999972 C84.9926189,13.9999972 85.9999779,15.0073562 85.9999779,16.2499966 Z M22.4149974,86.629975 C22.7464045,91.3529525 26.6804184,95.0115854 31.4149947,94.9999724 L68.6749833,94.9999724 C73.4095595,95.0115854 77.3435734,91.3529525 77.6749805,86.629975 L81.4999793,31.9999917 L18.4999986,31.9999917 L22.4149974,86.629975 Z"
                  fill="#000000"
                  fillRule="nonzero"
                />
              </g>
            </svg>
          )}
        </div>
      </button>
      <div className={styles.itemQty}>{cartItemQuantity(id)}</div>

      <button
        className={`btn-icon ${styles.incrementBtn}`}
        onClick={() => increment(id)}
      >
        <div className="icon" style={{ width: `20px` }}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            version="1.1"
            x="0px"
            y="0px"
            viewBox="0 0 100 125"
            enableBackground="new 0 0 100 100"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M47.1679688,14.4423828h5.6630859  c3.609375,0,6.5615234,2.9521484,6.5615234,6.5605469v19.6044922h19.6035156c3.609375,0,6.5615234,2.9521484,6.5615234,6.5605469  v5.6630859c0,3.609375-2.9521484,6.5605469-6.5615234,6.5605469H59.3925781v19.6054688  c0,3.6074219-2.9521484,6.5605469-6.5615234,6.5605469h-5.6630859c-3.6083984,0-6.5605469-2.953125-6.5605469-6.5605469V59.3916016  H21.0039063c-3.609375,0-6.5615234-2.9511719-6.5615234-6.5605469v-5.6630859c0-3.6083984,2.9521484-6.5605469,6.5615234-6.5605469  h19.6035156V21.0029297C40.6074219,17.3945313,43.5595703,14.4423828,47.1679688,14.4423828z"
            />
          </svg>
        </div>
      </button>
      {isLoading && <ToastMsg msg={"Updating quantity...-"} />}
    </div>
  );
};
