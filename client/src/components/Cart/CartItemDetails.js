import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useCartContext } from "../../contexts/CartContext";
import { useParams } from "react-router-dom";
import { fetchProductById } from "../../services/productServices";

const CartItemDetails = () => {
  const { itemId } = useParams();
  const { removeFromCart, updateCartItem } = useCartContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(itemId);
        setProduct(data);
      } catch (error) {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [itemId]);

  const handleRemove = () => {
    removeFromCart(itemId);
  };

  const handleIncrease = () => {
    updateCartItem(itemId, product.quantity + 1);
  };

  const handleDecrease = () => {
    if (product.quantity > 1) {
      updateCartItem(itemId, product.quantity - 1);
    }
  };

  if (loading) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "100vh" }}>
        <Spinner animation="border" />
      </div>
    );
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  if (!product) {
    return <p>No product found.</p>;
  }

  return (
    <Card className="my-4 product-detail-card" style={{ maxWidth: "800px", margin: "0 auto" }}>
      <Row>
        <Col md={5}>
          <Card.Img
            variant="top"
            src={product.image}
            alt={product.title}
            className="product-image"
          />
        </Col>
        <Col md={7}>
          <Card.Body>
            <Card.Title>{product.title}</Card.Title>
            <Card.Text>
              <strong>Category:</strong> {product.category}
            </Card.Text>
            <Card.Text>
              <strong>Description:</strong> {product.description}
            </Card.Text>
            <Card.Text>
              <strong>Price:</strong> ${product.price}
            </Card.Text>
            <Card.Text>
              <strong>Rating:</strong> {product.rating.rate} ({product.rating.count} reviews)
            </Card.Text>
            <Card.Text>
              <strong>Quantity:</strong> {product.quantity}
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="secondary" onClick={handleDecrease}>
                -
              </Button>
              <Button variant="secondary" className="ms-2" onClick={handleIncrease}>
                +
              </Button>
              <Button variant="danger" className="ms-2" onClick={handleRemove}>
                Remove
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default CartItemDetails;
