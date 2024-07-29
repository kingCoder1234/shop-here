import React, { useState } from 'react';
import ManageProducts from '../components/Admin/ManageProducts';
import ManageUsers from '../components/Admin/ManageUsers';
import { Container, Row, Col, Nav } from 'react-bootstrap';
import "./AdminPage.css"

const AdminPage = () => {
  const [activeSection, setActiveSection] = useState('users');

  return (
    <Container fluid>
      <Row>
        <Col xs={2} className="sidebar-col">
          <Nav className="flex-column">
            <Nav.Link
              href="#"
              onClick={() => setActiveSection('users')}
              active={activeSection === 'users'}
              className="nav-link"
            >
              Manage Users
            </Nav.Link>
            <Nav.Link
              href="#"
              onClick={() => setActiveSection('products')}
              active={activeSection === 'products'}
              className="nav-link"
            >
              Manage Products
            </Nav.Link>
          </Nav>
        </Col>
        <Col xs={10} className="content-col">
          <h1>Admin Dashboard</h1>
          {activeSection === 'users' && <ManageUsers />}
          {activeSection === 'products' && <ManageProducts />}
        </Col>
      </Row>
    </Container>
  );
};

export default AdminPage;
