import React, { useEffect, useState } from "react";
import "./Catagoiescss.css";
import { Container, Row, Col } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "../../slices/selectedCarSlice";
import { useNavigate } from "react-router-dom";
const API_URL = import.meta.env.VITE_API_URL;
export default function CatagoriesdComponent() {
  const { id } = useParams();
  const [adv, setAdv] = useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/advertisment/category/${id}`)
      .then((res) => res.json())
      .then((data) => setAdv(data))
      .catch((err) => console.error(err));
  }, [id]);

  const goToCarDetails = (car) => {
    dispatch(setSelectedCar(car));
    navigate("/Car_details");
  };

  return (
    <>
      <Container fluid className="px-0 catagories-container">
        <div className="catagoies-img">
          <img src="/Images/g-wagon-black.png" alt="" />{" "}
        </div>
        <div className="c-d-1"></div>
        <div className="c-d-2"></div>
        <div className="c-d-3"></div>
        <h1 className="adv-c-heading">Advertisement Catagories</h1>
      </Container>

      <Container fluid className="px-4">
        <h2 className="ad-c-txt-2">
          {adv && adv.length > 0 ? adv[0].Catagory_ID.Name : "Others"}
        </h2>

        {adv.length > 0 &&
          adv.map((item, index) => (
            <Row className="adv-c-list" key={index}>
              <Col xs={12} sm={12} md={3} className="px-0 py-2">
                <img src={`${API_URL}${item.Img}`} alt="Img" />
              </Col>
              <Col className="adv-c-box2 py-2">
                <h4>{item.Name}</h4>
                <p>{item.Catagory_ID?.Name}</p>
                <p>{item.Description}</p>
                <button
                  className="btn adv-c-btn"
                  onClick={() => goToCarDetails(item)}
                >
                  More Details
                </button>
              </Col>
            </Row>
          ))}
      </Container>
    </>
  );
}
