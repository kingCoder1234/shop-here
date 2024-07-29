import React from "react";
import { Link } from "react-router-dom";
import { Card, Button } from "react-bootstrap";
import "./Product.css";
import { useCartContext } from "../../contexts/CartContext";
import { getProfile } from "../../services/authService";

const Product = ({ product }) => {
  const { addToCart } = useCartContext();

  const handleAddToCart = () => {
    if (getProfile()) {
      if (product) {
        addToCart(product._id);
      }
    } else {
      alert("You need to be logged in to add items to the cart.");
    }
  };

  const handleBuyItem = () => {
    alert("Thank You!");
  };

  return (
    <Card
      className="my-3 product-card d-flex flex-column"
      style={{ height: "100%" }}
    >
      <Link to={`/products/${product._id}`} className="text-decoration-none">
        <Card.Img
          variant="top"
          src={product.image}
          alt={product.title}
          className="product-image"
        />
        <Card.Body className="d-flex flex-column">
          <Card.Title className="mb-2">{product.title}</Card.Title>
          <Card.Text className="text-muted">
            <strong>Category:</strong> {product.category}
          </Card.Text>
          <Card.Text className="text-muted">
            <strong>Price:</strong> ${product.price}
          </Card.Text>
          <Card.Text className="text-muted">
            <strong>Description:</strong> {product.description.slice(0, 80)}...
          </Card.Text>
          <Card.Text className="text-muted">
            <strong>Rating:</strong> {product.rating.rate} (
            {product.rating.count} reviews)
          </Card.Text>
        </Card.Body>
      </Link>
      <Card.Footer className="d-flex justify-content-between mt-auto">
        <Button variant="primary" onClick={handleAddToCart}>
          Add to Cart
        </Button>
        <Button variant="success" onClick={handleBuyItem}>
          Buy Now
        </Button>
      </Card.Footer>
    </Card>
  );
};

export default Product;
