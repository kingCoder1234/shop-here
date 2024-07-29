import React from "react";
import CartItem from "./CartItem";

const Cart = ({ items }) => {

  if (!items || items.length === 0) {
    return <p>Your cart is empty</p>;
  }
  return (
    <div>
      <h2>Items in Cart</h2>
      {items.map((item) => (
        <CartItem key={item.productId} item={item} />
      ))}
      <div className="mt-3">
        <h4>
          Total: $
          {items
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}
        </h4>
      </div>
    </div>
  );
};

export default Cart;
