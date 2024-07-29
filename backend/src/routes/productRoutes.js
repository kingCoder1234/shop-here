const express = require("express");
const { getAllProducts, addTocart, getOneProduct } = require("../controller");
const authenticate = require("../middleware/authenticate");
const router = express.Router();
const Product = require("../models/productModel");
const {
  getUserCart,
  removeFromCart,
  updateQuantity,
  clearCart,
} = require("../controller/productController");

router.get("/api/products", getAllProducts);
router.get("/api/products/:productId", getOneProduct);

router.post("/api/cart/:userId/add", authenticate, addTocart);
router.get("/api/carts/:userId", authenticate, getUserCart);
router.delete(
  "/api/cart/:userId/remove/:productId",
  authenticate,
  removeFromCart
);
router.put("/api/cart/:userId/update", authenticate, updateQuantity);
router.delete("/api/:userId/cart", authenticate, clearCart);

module.exports = router;
