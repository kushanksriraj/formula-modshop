export const CheckoutBox = ({ cartList }) => {
  const totalPrice = (cartList) => {
    return cartList.reduce(
      (acc, item) => acc + item.quantity * item.product.price,
      0
    );
  };

  return (
    <div className="checkout h-fit p-4">
      <div className="heading-2 m-v-4">Checkout</div>
      <div className="w-8 h-fit box-shadow pos-rel p-4">
        <div className="list-grid p-v-3 text-bold">
          <div>Product</div>
          <div>Quantity</div>
          <div>Total</div>
        </div>
        {cartList.map((product) => {
          return (
            <div key={product._id}>
              <div className="list-grid p-v-4">
                <div className="product-name-h-2 text-left p-h-1">
                  {product.product.name}
                </div>
                <div>{product.quantity}x</div>
                <div>
                  ₹{product.product.price * product.quantity}
                </div>
              </div>

              <div className="separator" />
            </div>
          );
        })}
        {cartList.length > 0 && (
          <div className="p-v-4 p-h-3 flex flex-end m-v-1">
            <span className="p-h-4">Grand total:</span>
            <span className="text-bold">₹{totalPrice(cartList)}</span>
          </div>
        )}
        {cartList.length > 0 && (
          <div className="p-2 flex flex-end">
            <button className="btn p-v-3 p-h-6 font-4 bg-color-3 color-2 text-bold border-round-small">
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
