import { Card, Container, Row, Col } from "react-bootstrap";
import "./ExploreCategoryCard.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;

export default function ExploreCatagoryCard() {
  const [catagory, setCatagory] = useState([]);
  useEffect(() => {
    fetch(`${API_URL}/api/catagory`)
      .then((res) => res.json())
      .then((data) => setCatagory(data))
      .catch((err) => console.error(err));
  }, []);
  const navigate = useNavigate();
  return (
    <>
      <Container fluid className="py-5 overflow-hidden">
        <h2
          style={{ color: "#01B075" }}
          className="e-c-title mb-5 text-center fw-bold"
        >
          Explore By Categories
        </h2>
        <Row className="g-5">
          {catagory.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={3} key={index}>
              <Card
                className="custom-card "
                key={item._id}
                onClick={() => navigate(`/category/${item._id}`)}
              >
                <Card.Img
                  variant="top"
                  style={{ height: "250px", objectFit: "cover" }}
                  src={`./Images/${item.Img}`}
                />
                <Card.Body>
                  <Card.Title className="fw-bold">{item.Name}</Card.Title>
                  <Card.Text style={{ color: "#01B075" }}>
                    {item.cars} Cars
                  </Card.Text>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </>
  );
}
