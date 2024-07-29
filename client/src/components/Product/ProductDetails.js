import React, { useEffect, useState } from "react";
import { Card, Button, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useCartContext } from "../../contexts/CartContext";
import { useParams } from "react-router";
import { fetchProductById } from "../../services/productServices";
import { getProfile } from "../../services/authService";

const ProductDetails = () => {
  const { productId } = useParams();
  const { addToCart, buyItems } = useCartContext();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const data = await fetchProductById(productId);
        setProduct(data);
      } catch (error) {
        setError("Failed to fetch product details. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [productId]);

  const handleAddToCart = () => {
    if (getProfile()) {
      if (product) {
        addToCart(product._id);
      }
    } else {
      alert("You need to be logged in to add items to the cart.");
    }
  };
  const handleBuyProduct = () => {
    if (getProfile()) {
      if (product) {
        buyItems(product._id);
      }
    } else {
      alert("You need to be logged in to add items to the cart.");
    }
  };

  if (loading) {
    return (
      <div
        className="d-flex justify-content-center align-items-center"
        style={{ height: "100vh" }}
      >
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
    <Card
      className="my-4 product-detail-card"
      style={{ maxWidth: "800px", margin: "0 auto" }}
    >
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
              <strong>Rating:</strong> {product.rating.rate} (
              {product.rating.count} reviews)
            </Card.Text>
            <div className="d-flex justify-content-between">
              <Button variant="primary" onClick={handleAddToCart}>
                Add to Cart
              </Button>
              <Button
                variant="success"
                className="ms-2"
                onClick={handleBuyProduct}
              >
                Buy Now
              </Button>
            </div>
          </Card.Body>
        </Col>
      </Row>
    </Card>
  );
};

export default ProductDetails;
