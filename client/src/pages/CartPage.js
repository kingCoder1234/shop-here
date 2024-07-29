import React, { useEffect } from "react";
import { useCartContext } from "../contexts/CartContext";
import { useProductContext } from "../contexts/ProductContext";
import CartList from "../components/Cart/CartList";

const CartPage = () => {
  const { cart, loading: cartLoading } = useCartContext();
  const { products, loadProducts } = useProductContext();

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  if (cartLoading) {
    return (
      <div className="d-flex justify-content-center my-4">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">Loading...</span>
        </div>
      </div>
    );
  }

  if (!cart || cart?.items?.length === 0) {
    return <p>Your cart is empty</p>;
  }

  const cartItemsWithProductDetails = cart?.items
    ?.map((cartItem) => {
      const product = products.find(
        (prod) => prod._id === cartItem.productId._id
      );
      return product ? { ...cartItem, product } : null;
    })
    .filter((item) => item !== null);

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItemsWithProductDetails?.length > 0 ? (
        <CartList cartData={cartItemsWithProductDetails} />
      ) : (
        <p style={{ margin: "100px 0 300px 0" }}>Your cart is empty</p>
      )}
    </div>
  );
};

export default CartPage;
