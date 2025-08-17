import React, { useEffect, useState } from "react";
import {
  Container,
  Nav,
  Button,
  Dropdown,
  NavItem,
  NavLink,
  Navbar,
  Offcanvas,
  Form,
  NavDropdown,
  Modal,
} from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { Sling as Hamburger } from "hamburger-react";
import { Link } from "react-router-dom";
import {
  faUser,
  faIdBadge,
  faRightFromBracket,
} from "@fortawesome/free-solid-svg-icons";

import "./navbar.css";
import LoginModal from "../forms/loginform";
import SignupModal from "../forms/signup";
import PostAdvertisment from "../forms/postAdv";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogout } from "../../slices/userSlice";

export default function NavbarMain() {
  const [category, setCategory] = useState([]);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [show, setShow] = useState(false);
  const [login, setLogin] = useState(false);

  useEffect(() => {
    fetch("http://localhost:4500/api/catagory")
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error(err));
  }, []);

  const expand = "lg";

  let isLogggedIn = useSelector((state) => state.userInfo.userInfo) || {};

  const [isOpen, setOpen] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);
  const [showAdvform, setShowAdvform] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  function confirmLogout() {
    dispatch(setUserLogout());
    navigate("/", { replace: true });
    setShow(false);
  }

  return (
    <>
      <Modal show={show} onHide={() => setShow(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Confirm Logout</Modal.Title>
        </Modal.Header>
        <Modal.Body>Are you sure you want to Logout?</Modal.Body>
        <Modal.Footer>
          <button onClick={() => setShow(false)} className="btn btn-success">
            Cancel
          </button>
          <button onClick={confirmLogout} className="btn btn-danger">
            Logout
          </button>
        </Modal.Footer>
      </Modal>
      <Modal show={login} onHide={() => setLogin(false)} centered>
        <Modal.Header closeButton>
          <Modal.Title>Login Required ⚠️</Modal.Title>
        </Modal.Header>
        <Modal.Body>Login Required For Posting Advertisemnts ⚠️</Modal.Body>
        <Modal.Footer className="d-flex justify-content-between align-items-center">
          <button
            onClick={() => {
              setShowLogin(true);
              setLogin(false);
            }}
            className="btn btn-success"
          >
            Login
          </button>
          <Link
            onClick={() => {
              setShowSignup(true);
              setLogin(false);
            }}
          >
            Do not have account ? signup
          </Link>
        </Modal.Footer>
      </Modal>
      <Container fluid className="p-0">
        {/* Top Bar */}
        {isLogggedIn["UserName"] ? (
          <Nav
            className="d-flex justify-content-end px-2 py-2 "
            style={{ backgroundColor: "#F2F2F2" }}
          >
            <Dropdown align="end">
              <Dropdown.Toggle
                as="div"
                className="user-img p-0 border-0 bg-transparent"
                style={{
                  cursor: "pointer",
                  width: "50px",
                  height: "50px",
                  overflow: "hidden",
                  borderRadius: "50%",
                }}
              >
                <img
                  className="w-100 h-100 "
                  src={`http://localhost:4500/uploads/${isLogggedIn.ImgPath}`}
                  alt={isLogggedIn.UserName || "User"}
                />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                {/* User name header */}
                <Dropdown.Header>
                  <FontAwesomeIcon icon={faUser} className="me-2" />
                  {isLogggedIn.UserName}
                </Dropdown.Header>

                {/* View Profile */}
                <Dropdown.Item onClick={() => navigate("/UserDashboard")}>
                  <FontAwesomeIcon icon={faIdBadge} className="me-2" />
                  View Profile
                </Dropdown.Item>

                {/* Logout */}
                <Dropdown.Item onClick={() => setShow(true)}>
                  <FontAwesomeIcon icon={faRightFromBracket} className="me-2" />
                  Logout
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        ) : (
          <Nav
            style={{ backgroundColor: "#F2F2F2" }}
            className="w-100 d-flex justify-content-end gap-2 p-2"
          >
            <Button
              onClick={() => setShowLogin(true)}
              style={{ background: "#01B075" }}
              className="border-0"
            >
              Login
            </Button>
            <Button
              onClick={() => setShowSignup(true)}
              style={{ background: "#01B075" }}
              className="border-0"
            >
              Signup
            </Button>
          </Nav>
        )}

        {/* Desktop Navbar */}
        <nav className="d-flex justify-content-between align-items-center p-2 w-100 main-nav">
          <div className="logo">
            <Link to="/" className="text-decoration-none">
              <h1 className="m-0">PakClassified</h1>
            </Link>
          </div>
          <div className="links d-none d-lg-flex align-items-center gap-3">
            <Link to="/">Home</Link>
            <Link to="/about">About</Link>
            <Dropdown as={NavItem}>
              <Dropdown.Toggle className="drop-down-h" as={NavLink}>
                Categories
              </Dropdown.Toggle>
              <Dropdown.Menu>
                {category.length > 0 ? (
                  category.map((item) => (
                    <Dropdown.Item
                      key={item._id}
                      onClick={() => navigate(`/category/${item._id}`)}
                    >
                      {item.Name}
                    </Dropdown.Item>
                  ))
                ) : (
                  <Dropdown.Item disabled>
                    No categories available
                  </Dropdown.Item>
                )}
              </Dropdown.Menu>
            </Dropdown>
            <Link to="/contact">Contact</Link>
            <button
              className="adv-btn"
              onClick={() => {
                if (isLogggedIn?.UserName) {
                  setShowAdvform(true);
                } else {
                  setLogin(true);
                }
              }}
            >
              Post Advertisement <FontAwesomeIcon icon={faArrowRight} />
            </button>
          </div>

          {/* Mobile Hamburger */}
          <div className="d-lg-none">
            <Hamburger toggled={isOpen} toggle={setOpen} />
          </div>
        </nav>
      </Container>

      {/* Mobile Offcanvas Menu */}
     {/* Mobile Offcanvas Menu */}
<Navbar expand={expand} className="d-lg-none">
  <Container fluid>
    <Navbar.Offcanvas
      show={isOpen}
      onHide={() => setOpen(false)}
      placement="end"
      id={`offcanvasNavbar-expand-${expand}`}
      aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
    >
      <Offcanvas.Header closeButton>
        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
          PakClassified Menu
        </Offcanvas.Title>
      </Offcanvas.Header>
      <Offcanvas.Body>
        <Nav className="flex-column">
          <Nav.Link as={Link} to="/" onClick={() => setOpen(false)}>
            Home
          </Nav.Link>
          <Nav.Link as={Link} to="/about" onClick={() => setOpen(false)}>
            About
          </Nav.Link>
          <NavDropdown title="Categories">
            {category.length > 0 ? (
              category.map((item) => (
                <NavDropdown.Item
                  key={item._id}
                  onClick={() => {
                    navigate(`/category/${item._id}`);
                    setOpen(false);
                  }}
                >
                  {item.Name}
                </NavDropdown.Item>
              ))
            ) : (
              <NavDropdown.Item disabled>
                No categories available
              </NavDropdown.Item>
            )}
          </NavDropdown>
          <Nav.Link
            as={Link}
            to="/contact"
            onClick={() => setOpen(false)}
          >
            Contact
          </Nav.Link>

          {/* ✅ Mobile Post Advertisement Button with login check */}
          <button
            className="adv-btn mt-3"
            onClick={() => {
              if (isLogggedIn?.UserName) {
                setShowAdvform(true);
              } else {
                setLogin(true);
              }
              setOpen(false); // close mobile menu
            }}
          >
            Post Advertisement <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </Nav>

        <Form
  className="d-flex mt-3"
  onSubmit={(e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
      setSearchTerm("");
      setOpen(false); // close mobile menu
    }
  }}
>
  <Form.Control
    type="search"
    placeholder="Search"
    className="me-2"
    aria-label="Search"
    value={searchTerm}
    onChange={(e) => setSearchTerm(e.target.value)}
  />
  <Button
    variant="outline-success"
    type="submit"
  >
    Search
  </Button>
</Form>
      </Offcanvas.Body>
    </Navbar.Offcanvas>
  </Container>
</Navbar>


      {/* Modals */}
      <LoginModal show={showLogin} onClose={() => setShowLogin(false)} />
      <SignupModal show={showSignup} onClose={() => setShowSignup(false)} />
      <PostAdvertisment
        show={showAdvform}
        onClose={() => setShowAdvform(false)}
      />
    </>
  );
}
