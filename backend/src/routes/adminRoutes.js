const express = require("express");
const authenticate = require("../middleware/authenticate");
const {
  addProduct,
  createUser,
  updateUser,
  deleteUser,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");

const { getAllUsers } = require("../controller");
const admin = require("../middleware/admin");
const router = express.Router();

router.post("/api/addproduct", authenticate, admin, addProduct);
router.put("/api/updateproduct/:id", authenticate, admin, updateProduct);
router.delete("/api/deleteproduct/:id", authenticate, admin, deleteProduct);

router.post("/api/users", authenticate, admin, createUser);
router.get("/api/users", authenticate, admin, getAllUsers);
router.delete("/api/users/:id", authenticate, admin, deleteUser);
router.put("/api/users/:id", authenticate, admin, updateUser);

module.exports = router;
