import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Link } from "react-router-dom";
import {
  faAngleRight,
  faLocationDot,
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import {
  faTwitter,
  faFacebookF,
  faYoutube,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";

import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer">
      <Container fluid className="pt-4">
        <Row>
          <Col xs={12} sm={6} md={3} className="footer-col">
            <h3>Company</h3>
            <p>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Totam
              voluptate, quis, dolorum consequuntur expedita vitae rerum magnam
              culpa ullam eum dignissimos libero! Fuga soluta quae delectus, vel
              quas optio reiciendis.
            </p>
          </Col>

          <Col xs={12} sm={6} md={3} className="footer-col">
            <h3>Quick Links</h3>
            <ul className="footer-links">
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faAngleRight} /> About Us
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faAngleRight} /> Contact Us
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faAngleRight} /> Privacy Policy
                </Link>
              </li>
              <li>
                <Link to="/about">
                  <FontAwesomeIcon icon={faAngleRight} /> Terms & Conditions
                </Link>
              </li>
            </ul>
          </Col>

          <Col xs={12} sm={6} md={3} className="footer-col">
            <h3>Contact</h3>
            <ul className="footer-contact">
              <li>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faLocationDot} /> Ferozpur Road,
                  Gulberg III, Lahore
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faPhone} /> +92 301 6822043
                </Link>
              </li>
              <li>
                <Link to="/contact">
                  <FontAwesomeIcon icon={faEnvelope} />{" "}
                  abdullahshahzad@gmail.com
                </Link>
              </li>
            </ul>
            <div className="social-media">
              <span>
                <FontAwesomeIcon icon={faTwitter} />
              </span>
              <span>
                <FontAwesomeIcon icon={faFacebookF} />
              </span>
              <span>
                <FontAwesomeIcon icon={faYoutube} />
              </span>
              <span>
                <FontAwesomeIcon icon={faLinkedinIn} />
              </span>
            </div>
          </Col>

          <Col xs={12} sm={6} md={3} className="footer-col">
            <h3>Newsletter</h3>
            <p>Subscribe to our newsletter for latest updates and news.</p>
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Your Email"
              />
              <button className="btn btn-subscribe" type="button">
                Subscribe
              </button>
            </div>
          </Col>
        </Row>
      </Container>
      <hr />
      <Container fluid>
        <Row>
          <Col xs={12} sm={6}>
            <p>
              &copy;{" "}
              <a href="#" className="text-light text-decoration-underline">
                {" "}
                PakClassified.
              </a>{" "}
              All Right Reserved Designed by{" "}
              <a href="#" className="text-light text-decoration-underline">
                {" "}
                Abdullah Shahzad
              </a>
            </p>
          </Col>
          <Col xs={12} sm={6} className="d-flex justify-content-end ">
            <div>
              <a href="#">Home</a> | <a href="#">Cookies</a> |{" "}
              <a href="#">FAQs</a> | <a href="#">Help</a>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
}
