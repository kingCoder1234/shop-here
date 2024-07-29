import React, { useEffect, useState } from "react";
import { useProductContext } from "../../contexts/ProductContext";
import { Link } from "react-router-dom";
import {
  Button,
  Table,
  Form,
  Container,
  Row,
  Col,
  Spinner,
  Modal,
  Alert,
} from "react-bootstrap";

const ManageProducts = () => {
  const { products, loadProducts, addNewProduct, editProduct, removeProduct } =
    useProductContext();
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [newProduct, setNewProduct] = useState({
    title: "",
    price: "",
    description: "",
    image: "",
    category: "",
    rating: { count: 0, rate: 0 },
  });
  const [editingProduct, setEditingProduct] = useState(null);

  useEffect(() => {
    const load = async () => {
      await loadProducts();
      setLoading(false);
    };
    load();
  }, [loadProducts]);

  const handleAddProduct = async () => {
    await addNewProduct(newProduct);
    setNewProduct({
      title: "",
      price: "",
      description: "",
      image: "",
      category: "",
      rating: { count: 0, rate: 0 },
    });
    setShowAddModal(false);
  };

  const handleEditProduct = async () => {
    if (editingProduct) {
      await editProduct(editingProduct._id, editingProduct);
      setEditingProduct(null);
      setShowEditModal(false);
    }
  };

  const handleDeleteProduct = async (productId) => {
    await removeProduct(productId);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingProduct((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <Container className="my-2">
      <Row>
        <Col>
          <h1 className="mb-4">Manage Products</h1>
          {loading ? (
            <div
              className="d-flex justify-content-center align-items-center"
              style={{ height: "60vh" }}
            >
              <Spinner animation="border" role="status">
                <span className="visually-hidden">Loading...</span>
              </Spinner>
            </div>
          ) : products.length > 0 ? (
            <Table striped bordered hover>
              <thead>
                <tr>
                  <th style={{ width: "50%" }}>Title</th>
                  <th>Price</th>
                  <th>Category</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr key={product._id}>
                    <td style={{ width: "50%" }}>{product.title}</td>
                    <td>${product.price}</td>
                    <td>${product.category}</td>
                    <td>
                      <Link
                        to={`/product/${product._id}`}
                        className="btn btn-info btn-sm me-2"
                      >
                        View
                      </Link>
                      <Button
                        variant="warning"
                        size="sm"
                        className="me-2"
                        onClick={() => {
                          setEditingProduct(product);
                          setShowEditModal(true);
                        }}
                      >
                        Edit
                      </Button>
                      <Button
                        variant="danger"
                        size="sm"
                        onClick={() => handleDeleteProduct(product._id)}
                      >
                        Delete
                      </Button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </Table>
          ) : (
            <Alert variant="info">No products found.</Alert>
          )}
          <Button
            variant="primary"
            className="mt-4"
            onClick={() => setShowAddModal(true)}
          >
            Add New Product
          </Button>

          {/* Add Product Modal */}
          <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Add New Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group className="mb-3">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    name="title"
                    value={newProduct.title}
                    onChange={handleChange}
                    placeholder="Product Title"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="text"
                    name="price"
                    value={newProduct.price}
                    onChange={handleChange}
                    placeholder="Product Price"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    name="description"
                    value={newProduct.description}
                    onChange={handleChange}
                    placeholder="Product Description"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Image</Form.Label>
                  <Form.Control
                    type="text"
                    name="image"
                    value={newProduct.image}
                    onChange={handleChange}
                    placeholder="Product Image URL"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Category</Form.Label>
                  <Form.Control
                    type="text"
                    name="category"
                    value={newProduct.category}
                    onChange={handleChange}
                    placeholder="Product Category"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating Count</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating.count"
                    value={newProduct.rating.count}
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        rating: { ...prevState.rating, count: e.target.value },
                      }))
                    }
                    placeholder="Rating Count"
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Rating Rate</Form.Label>
                  <Form.Control
                    type="number"
                    name="rating.rate"
                    value={newProduct.rating.rate}
                    onChange={(e) =>
                      setNewProduct((prevState) => ({
                        ...prevState,
                        rating: { ...prevState.rating, rate: e.target.value },
                      }))
                    }
                    placeholder="Rating Rate"
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowAddModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleAddProduct}>
                Add Product
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Edit Product Modal */}
          <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Edit Product</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              {editingProduct && (
                <Form>
                  <Form.Group className="mb-3">
                    <Form.Label>Title</Form.Label>
                    <Form.Control
                      type="text"
                      name="title"
                      value={editingProduct.title}
                      onChange={handleEditChange}
                      placeholder="Product Title"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Price</Form.Label>
                    <Form.Control
                      type="text"
                      name="price"
                      value={editingProduct.price}
                      onChange={handleEditChange}
                      placeholder="Product Price"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Description</Form.Label>
                    <Form.Control
                      type="text"
                      name="description"
                      value={editingProduct.description}
                      onChange={handleEditChange}
                      placeholder="Product Description"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Image</Form.Label>
                    <Form.Control
                      type="text"
                      name="image"
                      value={editingProduct.image}
                      onChange={handleEditChange}
                      placeholder="Product Image URL"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Category</Form.Label>
                    <Form.Control
                      type="text"
                      name="category"
                      value={editingProduct.category}
                      onChange={handleEditChange}
                      placeholder="Product Category"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating Count</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating.count"
                      value={editingProduct.rating.count}
                      onChange={(e) =>
                        setEditingProduct((prevState) => ({
                          ...prevState,
                          rating: {
                            ...prevState.rating,
                            count: e.target.value,
                          },
                        }))
                      }
                      placeholder="Rating Count"
                    />
                  </Form.Group>
                  <Form.Group className="mb-3">
                    <Form.Label>Rating Rate</Form.Label>
                    <Form.Control
                      type="number"
                      name="rating.rate"
                      value={editingProduct.rating.rate}
                      onChange={(e) =>
                        setEditingProduct((prevState) => ({
                          ...prevState,
                          rating: { ...prevState.rating, rate: e.target.value },
                        }))
                      }
                      placeholder="Rating Rate"
                    />
                  </Form.Group>
                </Form>
              )}
            </Modal.Body>
            <Modal.Footer>
              <Button
                variant="secondary"
                onClick={() => setShowEditModal(false)}
              >
                Close
              </Button>
              <Button variant="primary" onClick={handleEditProduct}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>
        </Col>
      </Row>
    </Container>
  );
};

export default ManageProducts;
