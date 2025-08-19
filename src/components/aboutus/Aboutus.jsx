import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import "./Aboutus.css";
export default function Aboutus() {
  return (
    <>
      <Container fluid className="px-0 catagories-container">
        <div className="catagoies-img">
          <img src="/PakClassified/Images/g-wagon-black.png" alt="" />{" "}
        </div>
        <div className="c-d-1"></div>
        <div className="c-d-2"></div>
        <div className="c-d-3"></div>
        <h1 className="adv-c-heading">About Us</h1>
      </Container>
      <Container fluid className="my-5">
        <Row>
          <Col xs={12} sm={12} md={6} className="main1-cont">
            <div className="about-img-1 d-flex flex-column">
              <img src="/PakClassified/Images/cross1.jpg" alt="img" />
              <img src="/PakClassified/Images/L-1.webp" alt="img" />
            </div>
            <div className="about-img-2 d-flex flex-column">
              <img src="/PakClassified/Images/wagon2.jpg" alt="img" />
              <img src="/PakClassified/Images/wagon3.jpg" alt="img" />
            </div>
          </Col>
          <Col xs={12} sm={12} md={6}>
            <h3 className="fw-bold fs-1">
              PakClassified is a <br />
              comprehensive online paltform whre user can browse, sell, buy, and
              compare cars
            </h3>
            <p className="my-5 ">
              Welcome to Pakclassified your premier destination for all things
              automotive in Pakistan. Our platform is designed to offer a
              seamless experience for users looking to browse , buy , sale and
              compare cars. Weather you are a car enthusiast or a first-time
              buyer, Pakclassified is committed to make your car shoppong
              journey smooth and hassle-free.
            </p>

            <div>
              <p>
                <FontAwesomeIcon style={{ color: "#01B075" }} icon={faCheck} />{" "}
                Customer Support
              </p>
              <p>
                <FontAwesomeIcon style={{ color: "#01B075" }} icon={faCheck} />{" "}
                Technical Assistance
              </p>
              <p>
                <FontAwesomeIcon style={{ color: "#01B075" }} icon={faCheck} />{" "}
                Feedback and suggestion
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
