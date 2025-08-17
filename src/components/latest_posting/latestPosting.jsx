import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "../../slices/selectedCarSlice";
import { useNavigate } from "react-router-dom";
import "./latest_posting.css";

export default function LatestPosting() {
  const [latestAds, setLatestAds] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const goToCarDetails = (car) => {
    dispatch(setSelectedCar(car));
    navigate("/Car_details");
  };

  useEffect(() => {
    fetch("http://localhost:4500/api/advertisment/getLatestAdv")
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch latest ads");
        }
        return res.json();
      })
      .then((data) => {
        setLatestAds(data); // API ka data state me store
      })
      .catch((error) => {
        console.error("Error fetching latest ads:", error);
      });
  }, []);

  return (
    <Container fluid className="overflow-hidden">
      <h2
        style={{ color: "#01B075" }}
        className="e-c-title mb-5 text-center fw-bold"
      >
        Latest Posting
      </h2>
      <Row>
        {latestAds.map((item, index) => (
          <Col xs={12} sm={12} md={6} lg={6} key={index} className="px-4 pb-5">
            <Card className="custom-card2 w-100">
              <Card.Img
                variant="top"
                style={{ height: "300px", objectFit: "cover" }}
                src={`http://localhost:4500${item.Img}`} // Ye API ka image URL hoga
              />
              <Card.Body>
                <Card.Title className="fw-bold">{item.Name}</Card.Title>
                <Card.Text>{item.Description}</Card.Text>
                <button
                  className="btn btn-lastest-posting"
                  onClick={() => goToCarDetails(item)}
                >
                  More Details
                </button>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </Container>
  );
}
