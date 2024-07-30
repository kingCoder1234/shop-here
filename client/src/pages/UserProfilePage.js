import React, { useState, useEffect } from "react";
import "./UserProfilePage.css";
import profileImage from "../assets/images/About.JPG";
import { useAuthContext } from "../contexts/AuthContext";
import { Button, Form, Modal, Spinner, Row, Col, Container, Card } from "react-bootstrap";

const UserProfilePage = () => {
  const { user, fetchUserProfile, updateUserProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    mobile: "",
    address: {
      village: "",
      district: "",
      state: "",
      country: "",
      pincode: "",
    },
  });

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error("Failed to fetch user profile:-", error);
      }
    };

    fetchProfile();
  }, [fetchUserProfile]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      address: {
        ...prevState.address,
        [name]: value,
      },
    }));
  };

  const handleEditClick = () => {
    if (user) {
      setFormData({
        name: user.name || "",
        age: user.age || "",
        mobile: user.mobileNo || "",
        address: user.address || {
          village: "",
          district: "",
          state: "",
          country: "",
          pincode: "",
        },
      });
    }
    setIsEditing(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!user) {
    return (
      <Container className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </Container>
    );
  }

  return (
    <Container className="my-4">
      <Row>
        <Col md={4} className="text-center mb-4">
          <img src={profileImage} alt="Profile" className="img-fluid rounded-circle profile-image" />
        </Col>
        <Col md={8}>
          <Card className="p-4 border rounded shadow-sm">
            <Card.Body>
              <Card.Title className="mb-3">Profile</Card.Title>
              <ul className="list-unstyled">
                <li className="mb-3">
                  <h5 className="profile-name">Name: {user.name}</h5>
                  <h5 className="profile-name">Role: {user.role}</h5>
                </li>
                <li className="mb-3">
                  <p className="profile-email">E-mail: {user.email}</p>
                </li>
                {user.mobileNo && (
                  <li className="mb-3">
                    <p className="profile-mobileNo">Mobile Number: {user.mobileNo}</p>
                  </li>
                )}
                <li className="mb-3">
                  <p className="profile-age">Age: {user.age}</p>
                </li>
                {user.address && (
                  <>
                    <li className="mb-3">
                      <p className="profile-address">Village: {user.address.village}</p>
                    </li>
                    <li className="mb-3">
                      <p className="profile-address">District: {user.address.district}</p>
                    </li>
                    <li className="mb-3">
                      <p className="profile-address">State: {user.address.state}</p>
                    </li>
                    <li className="mb-3">
                      <p className="profile-address">Country: {user.address.country}</p>
                    </li>
                    <li className="mb-3">
                      <p className="profile-address">PinCode: {user.address.pincode}</p>
                    </li>
                  </>
                )}
              </ul>
              <p className="profile-bio">
                Eleanor Pena is a creator of minimalistic & bold graphics and digital artwork. Artist/Creative Director by Day #NFT minting@ with FND night.
              </p>
              <div className="profile-social-links mb-3">
                <a href="/" className="me-2">
                  <i className="fa fa-twitter"></i>
                </a>
                <a href="/" className="me-2">
                  <i className="fa fa-instagram"></i>
                </a>
                <a href="/">
                  <i className="fa fa-linkedin"></i>
                </a>
              </div>
              <p className="profile-joined">Joined May, 2021</p>
              <Button variant="primary" onClick={handleEditClick} className="mt-3">
                Edit Profile
              </Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Edit User Modal */}
      <Modal show={isEditing} onHide={() => setIsEditing(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Profile</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={formData.name}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={formData.age}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Mobile No.</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter mobile number"
                name="mobile"
                value={formData.mobile}
                onChange={handleInputChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Village/Town</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter village/town"
                name="village"
                value={formData.address.village}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>District</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter district"
                name="district"
                value={formData.address.district}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>State</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter state"
                name="state"
                value={formData.address.state}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Country</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter country"
                name="country"
                value={formData.address.country}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Pincode</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter pincode"
                name="pincode"
                value={formData.address.pincode}
                onChange={handleAddressChange}
              />
            </Form.Group>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsEditing(false)}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </Container>
  );
};

export default UserProfilePage;
