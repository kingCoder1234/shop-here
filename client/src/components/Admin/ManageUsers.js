import React, { useState, useEffect } from "react";
import { useAuthContext } from "../../contexts/AuthContext";
import {
  Button,
  Table,
  Container,
  Spinner,
  Alert,
  Form,
  Modal,
  InputGroup,
  Pagination,
} from "react-bootstrap";

const ManageUsers = () => {
  const {
    users,
    loadUsers,
    handleAddNewUser,
    handleDeleteUser,
    handleEditUser,
  } = useAuthContext();
  const [loading, setLoading] = useState(true);
  const [showAddModal, setShowAddModal] = useState(false);
  const [newUser, setNewUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
  });
  const [editingUser, setEditingUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const [searchTerm, setSearchTerm] = useState("");
  const [sortRole, setSortRole] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        await loadUsers();
      } catch (error) {
        console.error("Failed to load users:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchUsers();
  }, [loadUsers]);

  const handleAddUser = async () => {
    try {
      await handleAddNewUser(
        newUser.name,
        newUser.email,
        newUser.role,
        newUser.age,
        newUser.password
      );
      setNewUser({ name: "", email: "", age: "", password: "", role: "user" });
      setShowAddModal(false);
    } catch (error) {
      console.error("Failed to add user:", error);
    }
  };

  const handleEdit = async () => {
    try {
      if (editingUser) {
        await handleEditUser(editingUser._id, editingUser);
        setEditingUser(null);
        setShowEditModal(false);
      }
    } catch (error) {
      console.error("Failed to edit user:", error);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const handleEditChange = (e) => {
    const { name, value } = e.target;
    setEditingUser((prevState) => ({ ...prevState, [name]: value }));
  };

  const filteredUsers = users.filter(
    (user) =>
      user?.name?.toLowerCase().includes(searchTerm?.toLowerCase()) ||
      user?.email?.toLowerCase().includes(searchTerm?.toLowerCase())
  );

  const sortedUsers = (() => {
    if (sortRole === "admin") {
      return filteredUsers
        .filter((user) => user.role === "admin")
        .concat(filteredUsers.filter((user) => user.role !== "admin"));
    } else if (sortRole === "user") {
      return filteredUsers
        .filter((user) => user.role === "user")
        .concat(filteredUsers.filter((user) => user.role !== "user"));
    } else {
      return filteredUsers;
    }
  })();

  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = sortedUsers.slice(indexOfFirstUser, indexOfLastUser);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Container className="my-5">
      <h1 className="mb-4">Manage Users</h1>
      <InputGroup className="mb-3">
        <Form.Control
          placeholder="Search by name or email"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <Button variant="outline-secondary" onClick={() => setSearchTerm("")}>
          Clear
        </Button>
      </InputGroup>
      <div className="mb-3">
        <Button variant="primary" onClick={() => setShowAddModal(true)}>
          Add New User
        </Button>
        <Button
          variant="secondary"
          onClick={() => setSortRole(sortRole === "admin" ? "" : "admin")}
        >
          Sort by Admin
        </Button>
        <Button
          variant="secondary"
          onClick={() => setSortRole(sortRole === "user" ? "" : "user")}
        >
          Sort by User
        </Button>
      </div>
      {loading ? (
        <div
          className="d-flex justify-content-center align-items-center"
          style={{ height: "60vh" }}
        >
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        </div>
      ) : currentUsers.length > 0 ? (
        <>
          <Table striped bordered hover responsive>
            <thead>
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Mobile No.</th>
                <th>Email Verified</th>
                <th>Role</th>
                <th>Age</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentUsers.map((user) => (
                <tr key={user._id}>
                  <td>{user.name}</td>
                  <td>{user.email}</td>
                  <td>{user.mobileNo}</td>
                  <td>{user.isVerified ? 'Yes' : 'No'}</td>
                  <td>{user.age}</td>
                  <td>{user.role}</td>
                  <td>
                    <Button
                      variant="warning"
                      className="me-2"
                      onClick={() => {
                        setEditingUser(user);
                        setShowEditModal(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Button
                      variant="danger"
                      onClick={() => handleDeleteUser(user._id)}
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
          <Pagination>
            {Array.from(
              { length: Math.ceil(sortedUsers.length / usersPerPage) },
              (_, i) => (
                <Pagination.Item
                  key={i + 1}
                  active={i + 1 === currentPage}
                  onClick={() => paginate(i + 1)}
                >
                  {i + 1}
                </Pagination.Item>
              )
            )}
          </Pagination>
        </>
      ) : (
        <Alert variant="info">No users found.</Alert>
      )}

      {/* Add User Modal */}
      <Modal show={showAddModal} onHide={() => setShowAddModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Add New User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formUserName">
              <Form.Label>Name</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter name"
                name="name"
                value={newUser.name}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserEmail">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="email"
                placeholder="Enter email"
                name="email"
                value={newUser.email}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserPassword">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Enter password"
                name="password"
                value={newUser.password}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserAge">
              <Form.Label>Age</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter age"
                name="age"
                value={newUser.age}
                onChange={handleChange}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formUserRole">
              <Form.Label>Role</Form.Label>
              <Form.Control
                as="select"
                name="role"
                value={newUser.role}
                onChange={handleChange}
              >
                <option value="user">User</option>
                <option value="admin">Admin</option>
              </Form.Control>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowAddModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleAddUser}>
            Add User
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Edit User Modal */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit User</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {editingUser && (
            <Form>
              <Form.Group className="mb-3" controlId="formEditUserName">
                <Form.Label>Name</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Enter name"
                  name="name"
                  value={editingUser.name}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditUserEmail">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  value={editingUser.email}
                  onChange={handleEditChange}
                />
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditUserRole">
                <Form.Label>Role</Form.Label>
                <Form.Control
                  as="select"
                  name="role"
                  value={editingUser.role}
                  onChange={handleEditChange}
                >
                  <option value="user">User</option>
                  <option value="admin">Admin</option>
                </Form.Control>
              </Form.Group>
              <Form.Group className="mb-3" controlId="formEditUserAge">
                <Form.Label>Age</Form.Label>
                <Form.Control
                  type="number"
                  placeholder="Enter age"
                  name="age"
                  value={editingUser.age}
                  onChange={handleEditChange}
                />
              </Form.Group>
            </Form>
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleEdit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
};

export default ManageUsers;
