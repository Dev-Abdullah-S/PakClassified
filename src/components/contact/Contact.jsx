import React from "react";
import { Container, Row, Col, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapMarkerAlt, faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";
import { useForm, Controller } from "react-hook-form";
import { TextField, Button } from "@mui/material";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./contact.css";
const API_URL = import.meta.env.VITE_API_URL;

export default function Contact() {
  const { control, handleSubmit, reset } = useForm();

  const onSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("✅ Message sent successfully!");
        reset(); // clear form
      } else {
        toast.error(result.msg || "❌ Failed to send message.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("⚠️ Something went wrong. Please try again.");
    }
  };

  return (
    <>
      <Container fluid className="px-0 catagories-container">
        <div className="catagoies-img">
          <img src="/PakClassified/Images/g-wagon-black.png" alt="" />
        </div>
        <div className="c-d-1"></div>
        <div className="c-d-2"></div>
        <div className="c-d-3"></div>
        <h1 className="adv-c-heading">About Us</h1>
      </Container>
      <Container fluid>
        <h3 className="text-center py-5 fw-bold">Contact For Any Query</h3>
        <div className="contacts">
          <div>
            <span className="icon-span">
              <FontAwesomeIcon icon={faMapMarkerAlt} />
            </span>{" "}
            Gulber III, Lahore
          </div>
          <div>
            <span className="icon-span">
              <FontAwesomeIcon icon={faEnvelope} />
            </span>{" "}
            abdullah@gmail.com
          </div>
          <div>
            <span className="icon-span">
              <FontAwesomeIcon icon={faPhone} />
            </span>{" "}
            0301 6 822 043
          </div>
        </div>
        <Row>
          <Col xs={12} sm={12} md={6}>
            <div className="w-100">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3402.165065209951!2d74.3369429!3d31.4921464!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3919043fb52276b5%3A0x2682e1fa63fcd065!2sEVS%20Training%20Institute%20Lahore!5e0!3m2!1sen!2s!4v1754331851460!5m2!1sen!2s"
                width="100%"
                height="450"
                style={{ border: "0" }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </Col>
          <Col xs={12} sm={12} md={6} style={{ marginBottom: "70px" }}>
            <p>
              For any Inquiries, assistance or feedback please fill out our
              contact form below. Our team is committed to responding promptly
              to ensure your experience with PakClassified is exceptional.
            </p>
            <Form onSubmit={handleSubmit(onSubmit)}>
              <Row>
                <Col sm={12} md={6}>
                  <Controller
                    name="name"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Name is Required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Your Name"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : ""}
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Col>
                <Col sm={12} md={6}>
                  <Controller
                    name="email"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Email is Required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Your Email"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : ""}
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Controller
                    name="subject"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Subject is Required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Subject"
                        variant="outlined"
                        error={!!error}
                        helperText={error ? error.message : ""}
                        fullWidth
                        margin="normal"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Controller
                    name="message"
                    control={control}
                    defaultValue=""
                    rules={{ required: "Message is required" }}
                    render={({ field, fieldState: { error } }) => (
                      <TextField
                        {...field}
                        label="Leave a message here"
                        multiline
                        rows={4}
                        variant="outlined"
                        fullWidth
                        error={!!error}
                        helperText={error ? error.message : ""}
                        margin="normal"
                      />
                    )}
                  />
                </Col>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="contained"
                    className="mt-3 btn-message"
                  >
                    Submit
                  </Button>
                </Col>
              </Row>
            </Form>
          </Col>
        </Row>
      </Container>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
