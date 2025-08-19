import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faMoneyBillWave,
  faCheck,
  faAngleRight,
} from "@fortawesome/free-solid-svg-icons";
import "./cardetails.css";
import { useSelector } from "react-redux";
const API_URL = import.meta.env.VITE_API_URL;

export default function CarDetalils() {
  const carData = useSelector((state) => state.selectedCar.car);
  const [user, setUser] = useState();

  useEffect(() => {
    if (!carData?.User_ID) return;

    fetch(`${API_URL}/api/user/${carData.User_ID}`)
      .then((res) => res.json())
      .then((data) => setUser(data))
      .catch(console.error);
  }, [carData?.User_ID]);

  return (
    <>
      <Container fluid className="px-0 catagories-container">
        <div className="catagoies-img">
          <img src="/Images/g-wagon-black.png" alt="" />{" "}
        </div>
        <div className="c-d-1"></div>
        <div className="c-d-2"></div>
        <div className="c-d-3"></div>
        <h1 className="adv-c-heading">Car Details</h1>
      </Container>
      <Container fluid className="my-5 px-4 ">
        <Row>
          <Col>
            <Row>
              <Col xs={12} sm={12} md={3}>
                <img
                  src={`${API_URL}${carData.Img}`}
                  className="w-100"
                  alt=""
                />
              </Col>
              <Col>
                <h3>{carData.Name}</h3>
                <p>
                  <span>
                    <FontAwesomeIcon
                      icon={faLocationDot}
                      className="text-success"
                    />{" "}
                    {carData?.City_area_ID.Name}
                  </span>{" "}
                  <span>
                    {" "}
                    <FontAwesomeIcon
                      icon={faMoneyBillWave}
                      className="text-success"
                    />{" "}
                    {carData.Price} $
                  </span>
                </p>
              </Col>
            </Row>
            <h2 className="my-3">Car Description</h2>
            <p>{carData?.Description}</p>
            <h2>Featurs</h2>
            {carData?.Feature?.split(".")
              .filter((line) => line.trim() !== "") // Remove empty lines
              .map((feature, index) => (
                <p key={index}>
                  <FontAwesomeIcon icon={faCheck} className="text-success" />
                  {feature.trim()} {/* Trim whitespace around each line */}
                </p>
              ))}
          </Col>
          <Col xs={12} sm={12} md={3}>
            <div className="adv-summary p-3">
              <h3 className="my-3">Advertisement Summary</h3>
              <p>
                <FontAwesomeIcon icon={faAngleRight} className="text-success" />{" "}
                {user?.Name}
              </p>
              <p>
                <FontAwesomeIcon icon={faAngleRight} className="text-success" />{" "}
                {new Date(carData?.starts_on).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "long",
                  year: "numeric",
                })}
              </p>
              <p>
                <FontAwesomeIcon icon={faAngleRight} className="text-success" />{" "}
                {carData?.City_area_ID.Name}
              </p>
              <p>
                <FontAwesomeIcon icon={faAngleRight} className="text-success" />{" "}
                Price : {carData?.Price} $
              </p>
              <p>
                <FontAwesomeIcon icon={faAngleRight} className="text-success" />{" "}
                Contact: {user?.ContactNo}
              </p>
            </div>
          </Col>
        </Row>
      </Container>
    </>
  );
}
