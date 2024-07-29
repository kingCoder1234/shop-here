const {
  signupUser,
  signinUser,
  getLoggedinUser,
  getAllUsers,
  cleanUpExpiredTokens,
} = require("./userController");
const {
  getAllProducts,
  addTocart,
  getOneProduct,
  addNewProduct,
  removeFromCart,
  updateQuantity,
  clearCart,
  getUserCart,
} = require("./productController");

module.exports = {
  signupUser,
  signinUser,
  getLoggedinUser,
  getAllProducts,
  addTocart,
  getOneProduct,
  getAllUsers,
  addNewProduct,
  removeFromCart,
  updateQuantity,
  clearCart,
  getUserCart,
  cleanUpExpiredTokens,
};
