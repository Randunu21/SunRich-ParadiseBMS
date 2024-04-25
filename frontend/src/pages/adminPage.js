import React from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const AdminDashboard = () => {
  return (
    <div>

      <div>
        {/* Header */}
        <header className="bg-dark text-white p-3">
          <Container>
            <Row>
              <Col xs={4}>
                <img src="placeholder_logo.png" alt="Company Logo" />
              </Col>
              <Col xs={4} className="text-center">
                <h3>Sunrich Paradise Admin Dashboard</h3>
              </Col>
              <Col xs={4} className="text-right">
                <i className="bi bi-person"></i>
              </Col>
            </Row>
          </Container>
        </header>
      </div>

      <hr />
      <div>

      </div>
      {/* Page content */}
      <Container className="mt-3">
        <div>
          <Row>
            <Col md={6}>
              <Link to="/cuspage" style={{ textDecoration: 'none' }}>
                <Card className="mb-3">
                  <Card.Body>
                    <Card.Title>Customer Management</Card.Title>
                    <Card.Text>Manage customer information</Card.Text>
                  </Card.Body>
                </Card>
              </Link>
            </Col>
            <Col md={6}>
              <Link to="#" style={{ textDecoration: 'none' }} >
              <Card className="mb-3" onClick={() => {/* Handle click event for Employee Management */ }}>
                <Card.Body>
                  <Card.Title>Employee Management</Card.Title>
                  <Card.Text>Manage employee information</Card.Text>
                </Card.Body>
              </Card>
              </Link>       
            </Col>
          </Row>
        </div>


        <div>
          <Row>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Customer Management */ }}>
                <Card.Body>
                  <Card.Title>Financial Management</Card.Title>
                  <Card.Text>Manage Financial information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Employee Management */ }}>
                <Card.Body>
                  <Card.Title>Product Management</Card.Title>
                  <Card.Text>Manage Product information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Customer Management */ }}>
                <Card.Body>
                  <Card.Title>Inventory Management</Card.Title>
                  <Card.Text>Manage Inventory information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Employee Management */ }}>
                <Card.Body>
                  <Card.Title>Inquiry Management</Card.Title>
                  <Card.Text>Manage Customer inquiry information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
        <div>
          <Row>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Customer Management */ }}>
                <Card.Body>
                  <Card.Title>Order Management</Card.Title>
                  <Card.Text>Customer order information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6}>
              <Card className="mb-3" onClick={() => {/* Handle click event for Employee Management */ }}>
                <Card.Body>
                  <Card.Title>Supplier Management</Card.Title>
                  <Card.Text>Manage supplier information</Card.Text>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </div>
      </Container>
    </div>
  );
}

export default AdminDashboard;