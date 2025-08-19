import React, { useState, useEffect, useRef } from "react";
import {
  Carousel,
  Dropdown,
  Container,
  Row,
  Col,
  Card,
  Modal,
} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch } from "@fortawesome/free-solid-svg-icons";
import { useDispatch } from "react-redux";
import { setSelectedCar } from "../../slices/selectedCarSlice";
import { useNavigate } from "react-router-dom";
import "./carousel.css";
import PostAdvertisment from "../forms/postAdv";
import { useSelector } from "react-redux";
const API_URL = import.meta.env.VITE_API_URL;

function CarouselLanding() {
  const [keyword, setKeyword] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedCityArea, setSelectedCityArea] = useState(null);
  const [categories, setCategories] = useState([]);
  const [cityAreas, setCityAreas] = useState([]);
  const [searchResults, setSearchResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [searched, setSearched] = useState(false);
  const [showPostModal, setShowPostModal] = useState(false);

  const openPostModal = () => setShowPostModal(true);
  const closePostModal = () => setShowPostModal(false);
  let isLogggedIn = useSelector((state) => state.userInfo.userInfo) || {};

  const keywordInputRef = useRef(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    fetch(`${API_URL}/api/catagory`)
      .then((res) => res.json())
      .then((data) => setCategories(data))
      .catch((err) => console.error(err));

    fetch(`${API_URL}/api/city_area`)
      .then((res) => res.json())
      .then((data) => setCityAreas(data))
      .catch((err) => console.error(err));
  }, []);
//   if (!keyword && !selectedCategory && !selectedCityArea) {
//   setSearched(false);
//   return;
// }


 const handleSearch = async () => {
  // ✅ Prevent search if nothing is selected/entered
  if (!keyword && !selectedCategory && !selectedCityArea) {
    setSearched(false); // Do not show "No results" either
    return;
  }

  setSearched(true);
  setLoading(true);
  setError("");
  try {
    const params = new URLSearchParams();
    if (keyword) params.append("keyword", keyword);
    if (selectedCategory) params.append("categoryId", selectedCategory._id);
    if (selectedCityArea) params.append("cityAreaId", selectedCityArea._id);

    const res = await fetch(
      `${API_URL}/api/advertisment/search?${params.toString()}`
    );
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();
    setSearchResults(data);
  } catch (err) {
    console.error("Search error:", err);
    setError("Failed to fetch search results");
  } finally {
    setLoading(false);
  }
};


  const goToCarDetails = (car) => {
    dispatch(setSelectedCar(car));
    navigate("/Car_details");
  };

  const focusKeywordInput = () => {
    if (keywordInputRef.current) {
      keywordInputRef.current.focus();
    }
  };
  const [login, setLogin] = useState(false);
  return (
    <>
      <Modal show={login} onHide={() => setLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login Required For Posting Advertisemnts ⚠️</Modal.Body>
      </Modal>
      {/* Carousel */}
      <Carousel fade className="position-relative">
        {["laxus-malaysia.jpg", "L-2.jpg", "L-1.webp"].map((img, idx) => (
          <Carousel.Item key={idx} className="w-100">
            <img
              className="d-block w-100"
              src={`/Images/${img}`}
              alt={`Slide ${idx + 1}`}
              style={{ height: "600px", objectFit: "cover" }}
            />
            <Carousel.Caption className="c-item">
              <h3 className="fs-1">
                Unlock Your Drive : <br /> Explore Compare <br />
              </h3>
              <p className="fw-semibold">
                Where Every Journey Starts With The Right Car
              </p>

              <div className="btn-carousle">
                {/* Focus keyword input on click */}
                <button onClick={focusKeywordInput}>Search A Car</button>

                {/* Post Advertisement button */}
                <button
                  onClick={() => {
                    if (isLogggedIn?.UserName) {
                      openPostModal(true); // Show post ad modal
                    } else {
                      setLogin(true); // Show login modal
                    }
                  }}
                >
                  Post Advertisement
                </button>
              </div>

              {/* Decorative lines */}
              <div className="d-line1"></div>
              <div className="d-line2"></div>
              <div className="d-line3"></div>
            </Carousel.Caption>
          </Carousel.Item>
        ))}
      </Carousel>

      {/* Search Bar */}
     <Container className="colapse" fluid>
  <Row className="d-flex justify-content-between align-items-center g-2">
    <Col xs={12} md={3}>
      <input
        ref={keywordInputRef}
        type="text"
        placeholder="Keywords"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
        className="w-100"
      />
    </Col>

    <Col xs={12} md={3}>
      <Dropdown className="c-dropdown w-100">
        <Dropdown.Toggle className="w-100" variant="light">
          {selectedCategory ? selectedCategory.Name : "Select Category"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {categories.map((cat) => (
            <Dropdown.Item
              key={cat._id}
              onClick={() => setSelectedCategory(cat)}
            >
              {cat.Name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Col>

    <Col xs={12} md={3}>
      <Dropdown className="c-dropdown w-100">
        <Dropdown.Toggle className="w-100" variant="light">
          {selectedCityArea ? selectedCityArea.Name : "Select City Area"}
        </Dropdown.Toggle>
        <Dropdown.Menu>
          {cityAreas.map((city) => (
            <Dropdown.Item
              key={city._id}
              onClick={() => setSelectedCityArea(city)}
            >
              {city.Name}
            </Dropdown.Item>
          ))}
        </Dropdown.Menu>
      </Dropdown>
    </Col>

    <Col xs={12} md={2}>
      <button className="btn-carousel-search w-100" onClick={handleSearch}>
        <FontAwesomeIcon icon={faSearch} /> Search
      </button>
    </Col>
  </Row>
</Container>


      {/* Search Results */}
      {searched && (
        <Container fluid className="mt-4">
          {loading && <p className="text-center">Loading results...</p>}
          {error && <p className="text-danger text-center">{error}</p>}

          {!loading && !error && searchResults.length > 0 ? (
            <Row>
              {searchResults.map((ad) => (
                <Col
                  xs={12}
                  sm={12}
                  md={6}
                  lg={6}
                  key={ad._id}
                  className="px-4 pb-5"
                >
                  <Card className="custom-card2 w-100">
                    <Card.Img
                      variant="top"
                      style={{ height: "300px", objectFit: "cover" }}
                      src={`${API_URL}${ad.Img}`}
                    />
                    <Card.Body>
                      <Card.Title className="fw-bold">{ad.Name}</Card.Title>
                      <Card.Text>{ad.Description}</Card.Text>
                      <button
                        className="btn btn-lastest-posting"
                        onClick={() => goToCarDetails(ad)}
                      >
                        View Details
                      </button>
                    </Card.Body>
                  </Card>
                </Col>
              ))}
            </Row>
          ) : (
            !loading &&
            !error && (
              <p className="text-primary text-center fs-4 mt-5">
                No results found.
              </p>
            )
          )}
        </Container>
      )}
      <PostAdvertisment show={showPostModal} onClose={closePostModal} />
    </>
  );
}

export default CarouselLanding;
