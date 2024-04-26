import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { Link } from "react-router-dom";

const OrderHome = () => {
  return (
    <div className="order-home">
      <style type="text/css">
        {`
        .order-home .card-container {
          transition: transform 0.2s ease-in-out;
        }

        .order-home .card-container:hover {
          transform: translateY(-5px);
          box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
        }

        .order-home .card {
          cursor: pointer;
          border: none;
          border-radius: 10px;
        }

        .order-home .card-body {
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          padding: 2rem;
        }

        .order-home .card-title {
          font-size: 1.5rem;
          font-weight: bold;
          color: #065535;
          margin-bottom: 0.5rem;
        }

        .order-home .card-text {
          color: #333;
          text-align: center;
        }

        .order-home header {
          background-color: #065535;
          padding: 1rem 0;
        }

        .order-home .bg-dark {
          background-color: #065535 !important;
        }

        body {
          background: #dbf8e3;
        }
      `}
      </style>
      <header className="text-white text-center">
        <Container>
          <Row>
            <Col>
              <h1>Orders Dashboard</h1>
            </Col>
          </Row>
        </Container>
      </header>

      <Container className="mt-5">
        <Row>
          {[
            {
              title: "Pending Orders",
              text: "Manage customer Pending Orders",
              to: "/pending-orders",
            },
            {
              title: "OnGoing Orders",
              text: "View Current Order Details",
              to: "/ongoing-orders",
            },
            {
              title: "Past Orders",
              text: "View Completed Order information",
              to: "/past-orders",
            },
            {
              title: "Quotations",
              text: "Manage Customer Quotations",
              to: "/admin-quotation-list",
            },
          ].map((item, idx) => (
            <Col md={6} key={idx} className="mb-4">
              <Link to={item.to || "#"} style={{ textDecoration: "none" }}>
                <div className="card-container">
                  <Card>
                    <Card.Body>
                      <Card.Title>{item.title}</Card.Title>
                      <Card.Text>{item.text}</Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </Link>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default OrderHome;
