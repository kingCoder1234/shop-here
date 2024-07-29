const Product = require("../models/productModel");
const User = require("../models/userModel");
const Cart = require("../models/cartModel");
const bcrypt = require("bcryptjs");

const getAllProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const getOneProduct = async (req, res) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findById(productId);

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const addProduct = async (req, res) => {
  try {
    const { title, price, description, image, category, rating } = req.body;

    const newProduct = new Product({
      title,
      price,
      description,
      image,
      category,
      rating: {
        count: rating?.count || 0,
        rate: rating?.rate || 0,
      },
    });

    await newProduct.save();
    res.status(201).json(newProduct);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ message: "Error creating product", error });
  }
};
const updateProduct = async (req, res) => {
  const productId = req.params.id;
  const updatedProductData = req.body;

  try {
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error.message);
    res.status(500).json({ message: "Failed to update product" });
  }
};
const deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedProduct = await Product.findByIdAndDelete(id);
    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting product", error });
  }
};
const addTocart = async (req, res) => {
  const { userId } = req.params;
  const { productId, quantity = 1 } = req.body;

  try {
    // Find the product
    const product = await Product.findById(productId);
    if (!product) {
      return res.status(404).json({ error: "Product not found." });
    }

    // Find the cart for the user
    let cart = await Cart.findOne({ user: userId });

    if (!cart) {
      // Create a new cart if it doesn't exist
      cart = new Cart({
        user: userId,
        items: [{ productId, quantity, price: product.price }],
      });
    } else {
      // Update the existing cart
      const existingItem = cart.items.find(
        (item) => item.productId.toString() === productId.toString()
      );

      if (existingItem) {
        existingItem.quantity += quantity;
        existingItem.price = product.price;
      } else {
        cart.items.push({ productId, quantity, price: product.price });
      }
    }
    await cart.save();

    res
      .status(200)
      .json({ cart, message: "Product added to cart successfully." });
  } catch (error) {
    console.error("Error adding to cart:", error);
    res.status(500).json({
      error: "An error occurred while adding the product to the cart.",
    });
  }
};
const getUserCart = async (req, res) => {
  const { userId } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId }).populate(
      "items.productId"
    );
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }
    res.status(200).json(cart);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching the cart." });
  }
};
const removeFromCart = async (req, res) => {
  const { userId, productId } = req.params;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }

    cart.items = cart.items.filter(
      (item) => item.productId.toString() !== productId
    );
    await cart.save();
    res
      .status(200)
      .json({ cart, message: "Item removed from cart successfully." });
  } catch (error) {
    res.status(500).json({
      error: "An error occurred while removing the item from the cart.",
    });
  }
};
const updateQuantity = async (req, res) => {
  const { userId } = req.params;
  const { productId, value } = req.body;
  try {
    const cart = await Cart.findOne({ user: userId });
    if (!cart) {
      return res.status(404).json({ error: "Cart not found." });
    }
    const item = cart.items.find(
      (item) => item.productId.toString() === productId
    );
    if (!item) {
      return res.status(404).json({ error: "Item not found in cart." });
    }

    item.quantity += value;

    await cart.save();
    res.status(200).json({ cart });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while updating the quantity." });
  }
};
const clearCart = async (req, res) => {
  const { userId } = req.params;
  try {
    await Cart.findOneAndDelete({ user: userId });
    res.status(200).json({ message: "Cart cleared successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while clearing the cart." });
  }
};
const createUser = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      age,
      role,
      isVerified,
      shoppingCart,
      tokens,
    } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists." });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      age,
      role,
      isVerified,
      shoppingCart,
      tokens,
    });

    await newUser.save();

    res.status(201).json({
      message: "User created successfully.",
      user: newUser,
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res
      .status(500)
      .json({ error: "Error creating user. Please try again later." });
  }
};
const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, age, role } = req.body;

  try {
    const user = await User.findById(id);

    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }

    if (name) user.name = name;
    if (email) user.email = email;
    if (age) user.age = age;
    if (role) user.role = role;

    await user.save();

    res.status(200).json({ message: "User updated successfully", user });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
const deleteUser = async (req, res) => {
  const { id } = req.params;
  try {
    const deletedUser = await User.findByIdAndDelete(id);
    if (!deletedUser) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting user", error });
  }
};

module.exports = {
  addProduct,
  updateProduct,
  deleteProduct,
  createUser,
  getAllProducts,
  addTocart,
  getOneProduct,
  getUserCart,
  removeFromCart,
  updateQuantity,
  clearCart,
  updateUser,
  deleteUser,
};
