/* eslint-disable jsx-a11y/img-redundant-alt */
import React from "react";
import { useCartContext } from "../../contexts/CartContext";

const CartItem = ({ item }) => {
  const { removeFromCart, updateCartItem } = useCartContext();
  const handleRemove = () => {
    removeFromCart(item.productId._id);
  };

  const handleIncrease = () => {
    updateCartItem(item.productId._id, 1);
  };

  const handleDecrease = () => {
    if (item.quantity > 1) {
      updateCartItem(item.productId._id, -1);
    }
  };

  if (!item) {
    return <div>Loading...</div>;
  }
  return (
    <div className="border rounded p-3 mb-3 bg-light">
      <div className="d-flex justify-content-between align-items-center">
        <div>
          <img
            src={item.productId.image}
            alt="Product Image"
            style={{ width: "40%" }}
          />
        </div>
        <div>
          <h5>{item.productId.title}</h5>
          <h6>{item.productId.category}</h6>{" "}
          <p>Price: ${item.productId.price.toFixed(2)}</p>
          <p>Price: ${item.productId.description.slice(0, 80)}...</p>
        </div>
        <div className="d-flex align-items-center">
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={handleDecrease}
          >
            -
          </button>
          <span className="mx-2">{item.quantity}</span>
          <button
            className="btn btn-secondary btn-sm me-2"
            onClick={handleIncrease}
          >
            +
          </button>
          <button className="btn btn-danger btn-sm" onClick={handleRemove}>
            Remove
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartItem;
