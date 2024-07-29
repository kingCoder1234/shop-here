import React, { useState, useEffect } from "react";
import "./UserProfilePage.css";
import profileImage from "../assets/images/About.JPG";
import { useAuthContext } from "../contexts/AuthContext";
import { Button, Form, Modal, Spinner, Row, Col } from "react-bootstrap";

const UserProfilePage = () => {
  const { user, fetchUserProfile, updateUserProfile } = useAuthContext();
  const [isEditing, setIsEditing] = useState({
    name: false,
    age: false,
    mobile: false,
    address: false,
  });
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
  const [editField, setEditField] = useState("");

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        await fetchUserProfile();
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
      }
    };

    fetchProfile();
  }, [fetchUserProfile]);

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        age: user.age,
        mobile: user.mobileNo,
        address: user.address,
      });
    }
  }, [user]);

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

  const handleEditClick = (field) => {
    setEditField(field);
    setIsEditing((prevState) => ({ ...prevState, [field]: true }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateUserProfile(formData);
      setIsEditing({
        name: false,
        age: false,
        mobile: false,
        address: false,
      });
      setEditField("");
    } catch (error) {
      console.error("Failed to update profile:", error);
    }
  };

  if (!user) {
    return (
      <div className="d-flex justify-content-center align-items-center" style={{ height: "60vh" }}>
        <Spinner animation="border" role="status">
          <span className="visually-hidden">Loading...</span>
        </Spinner>
      </div>
    );
  }

  return (
    <div className="container my-4 text-dark">
      <Row>
        <Col md={4} className="text-center mb-4">
          <img src={profileImage} alt="Profile" className="img-fluid rounded-circle profile-image" />
        </Col>
        <Col md={8}>
          <div className="profile-card p-4 border rounded shadow-sm ">
            <ul className="list-unstyled">
              <li className="mb-3">
                <h4 className="profile-name">Name: {user.name}</h4>
                <i onClick={() => handleEditClick("name")} className="fa fa-edit text-primary cursor-pointer"></i>
              </li>
              <li className="mb-3">
                <p className="profile-email">E-mail: {user.email}</p>
              </li>
              <li className="mb-3">
                <p className="profile-mobileNo">Mobile Number: {user.mobileNo}</p>
                <i onClick={() => handleEditClick("mobile")} className="fa fa-edit text-primary cursor-pointer"></i>
              </li>
              <li className="mb-3">
                <p className="profile-age">Age: {user.age}</p>
                <i onClick={() => handleEditClick("age")} className="fa fa-edit text-primary cursor-pointer"></i>
              </li>
              <li className="mb-3">
                <p className="profile-address">Village: {user.address?.village}</p>
                <p className="profile-address">District: {user.address?.district}</p>
                <p className="profile-address">State: {user.address?.state}</p>
                <p className="profile-address">Country: {user.address?.country}</p>
                <p className="profile-address">PinCode: {user.address?.pincode}</p>
                <i onClick={() => handleEditClick("address")} className="fa fa-edit text-primary cursor-pointer"></i>
              </li>
            </ul>
            <p className="profile-bio">
              Eleanor Pena is a creator of minimalistic & bold graphics and digital artwork. Artist/Creative Director by Day #NFT minting@ with FND night.
            </p>
            <div className="profile-social-links">
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
          </div>
        </Col>
      </Row>

      {/* Edit User Modal */}
      <Modal show={isEditing[editField]} onHide={() => setIsEditing({ ...isEditing, [editField]: false })}>
        <Modal.Header closeButton>
          <Modal.Title>Edit {editField.charAt(0).toUpperCase() + editField.slice(1)}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={handleSubmit}>
            {editField === "name" && (
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
            )}
            {editField === "age" && (
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
            )}
            {editField === "mobile" && (
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
            )}
            {editField === "address" && (
              <div>
                <Form.Group className="mb-3">
                  <Form.Label>Village/Town</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter village/town"
                    name="village"
                    value={formData?.address?.village}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>District</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter district"
                    name="district"
                    value={formData.address?.district}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>State</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter state"
                    name="state"
                    value={formData.address?.state}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Country</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter country"
                    name="country"
                    value={formData.address?.country}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
                <Form.Group className="mb-3">
                  <Form.Label>Pincode</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder="Enter pincode"
                    name="pincode"
                    value={formData.address?.pincode}
                    onChange={handleAddressChange}
                  />
                </Form.Group>
              </div>
            )}
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setIsEditing({ ...isEditing, [editField]: false })}>
                Close
              </Button>
              <Button variant="primary" type="submit">
                Save Changes
              </Button>
            </Modal.Footer>
          </Form>
        </Modal.Body>
      </Modal>
    </div>
  );
};

export default UserProfilePage;
