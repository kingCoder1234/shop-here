import React from "react";
import CartItem from "./CartItem";

const CartList = ({ cartData }) => {
  return (
    <div className="container mt-4 text-dark">
      <h2>Cart Items</h2>
      {cartData.map((item) => (
        <CartItem key={item.product._id} item={item} />
      ))}
    </div>
  );
};
export default CartList;
