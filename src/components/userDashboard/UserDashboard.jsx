import React, { useEffect, useState } from "react";
import { Container, Row, Col, Card, Modal, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { setUserLogout } from "../../slices/userSlice";
import { useNavigate } from "react-router-dom";
import PostAdvertisment from "../forms/postAdv";
import { toast } from "react-toastify";
import "./userDashborad.css";
import { useForm } from "react-hook-form";
import { TextField, Box } from "@mui/material";
import { setSelectedCar } from "../../slices/selectedCarSlice";
const API_URL = import.meta.env.VITE_API_URL;

export default function UserDashboeard() {
  const user = useSelector((state) => state.userInfo.userInfo);
  const [userData, setUserData] = useState();
  const [show, setShow] = useState(false);
  const [adv, setAdv] = useState([]);
  const [editingAdv, setEditingAdv] = useState(null);
  const [modalType, setModalType] = useState(""); // "logout" or "delete"
  const [selectedAdvId, setSelectedAdvId] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const Navigate = useNavigate();
  const dispatch = useDispatch();

  // Fetch user data
  useEffect(() => {
    if (!user?.ID) return;
    fetch(`${API_URL}/api/user/${user.ID}`)
      .then((res) => res.json())
      .then((data) => setUserData(data))
      .catch(console.error);
  }, [user?.ID]);

  // Fetch advertisements
  useEffect(() => {
    if (!user?.ID) return;
    fetch(`${API_URL}/api/advertisment/${user.ID}`)
      .then((res) => res.json())
      .then((data) => setAdv(data))
      .catch(console.error);
  }, [user?.ID]);

  // Logout action
  function confirmLogout() {
    dispatch(setUserLogout());
    Navigate("/", { replace: true });
    toast.success("User logged out successfully!", {
      position: "top-right",
      autoClose: 2000,
    });
  }

  // Delete advertisement action
  function confirmDeleteAdv() {
    if (!selectedAdvId) return;
    fetch(`${API_URL}/api/advertisment/${selectedAdvId}`, {
      method: "DELETE",
    })
      .then((res) => {
        if (res.ok) {
          setAdv((prev) => prev.filter((item) => item._id !== selectedAdvId));
          toast.success("Advertisement deleted successfully!", {
            position: "top-right",
            autoClose: 2000,
          });
        } else {
          toast.error("Failed to delete advertisement", {
            position: "top-right",
            autoClose: 2000,
          });
        }
      })
      .catch(() =>
        toast.error("Something went wrong!", {
          position: "top-right",
          autoClose: 2000,
        })
      )
      .finally(() => {
        setSelectedAdvId(null);
      });
  }

  // Show confirmation modal for logout
  function handleLogoutClick() {
    setModalType("logout");
    setShowModal(true);
  }

  // Show confirmation modal for delete
  function handleDeleteClick(id) {
    setSelectedAdvId(id);
    setModalType("delete");
    setShowModal(true);
  }

  // Modal confirm handler
  function handleModalConfirm() {
    if (modalType === "logout") {
      confirmLogout();
    } else if (modalType === "delete") {
      confirmDeleteAdv();
    }
    setShowModal(false);
  }

  const [isModalVisible, setModalVisible] = useState(false); // changed variable name

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    reset,
  } = useForm();

  const handleFormSubmit = async (data) => {
    try {
      const res = await fetch(`${API_URL}/api/user/${user.ID}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          Name: data.name,
          Email: data.email,
          ContactNo: data.contact,
          DOB: data.dob,
        }),
      });

      if (res.ok) {
        toast.success("User information updated successfully!", {
          position: "top-right",
          autoClose: 2000,
        });

        // Fetch updated user data
        const updatedData = await res.json();
        setUserData(updatedData);

        setModalVisible(false);
        reset();
      } else {
        toast.error("Failed to update user info!", {
          position: "top-right",
          autoClose: 2000,
        });
      }
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong!", {
        position: "top-right",
        autoClose: 2000,
      });
    }
  };

  useEffect(() => {
    if (userData) {
      setValue("name", userData.Name || "");
      setValue("email", userData.Email || "");
      setValue("contact", userData.ContactNo || "");
      setValue("dob", userData.DOB ? userData.DOB.split("T")[0] : "");
    }
  }, [userData, setValue]);

  const goToCarDetails = (car) => {
    dispatch(setSelectedCar(car));
    Navigate("/Car_details");
  };

  return (
    <>
      <PostAdvertisment
        show={show}
        onClose={() => setShow(false)}
        initialData={editingAdv}
      />
      {/* edit user info */}
      <Modal
        show={isModalVisible}
        onHide={() => setModalVisible(false)}
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title>Edit User Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <form onSubmit={handleSubmit(handleFormSubmit)}>
            <Box mb={2}>
              <TextField
                fullWidth
                label="Name"
                {...register("name", { required: "Name is required" })}
                error={!!errors.name}
                helperText={errors.name?.message}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                    message: "Invalid email address",
                  },
                })}
                error={!!errors.email}
                helperText={errors.email?.message}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Date of Birth"
                type="date"
                InputLabelProps={{ shrink: true }}
                {...register("dob", { required: "Date of Birth is required" })}
                error={!!errors.dob}
                helperText={errors.dob?.message}
              />
            </Box>

            <Box mb={2}>
              <TextField
                fullWidth
                label="Contact No"
                type="tel"
                {...register("contact", {
                  required: "Contact number is required",
                  pattern: {
                    value: /^[0-9]{10,15}$/,
                    message: "Contact number must be 10-15 digits",
                  },
                })}
                error={!!errors.contact}
                helperText={errors.contact?.message}
              />
            </Box>

            <Button variant="primary" type="submit" className="w-100">
              Submit
            </Button>
          </form>
        </Modal.Body>
      </Modal>

      {/* Reusable Confirmation Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {modalType === "logout"
              ? "Confirm Logout"
              : "Confirm Delete Advertisement"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {modalType === "logout"
            ? "Are you sure you want to logout?"
            : "Are you sure you want to delete this advertisement?"}
        </Modal.Body>
        <Modal.Footer>
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-success"
          >
            Cancel
          </button>
          <button
            onClick={handleModalConfirm}
            className={`btn ${
              modalType === "logout" ? "btn-danger" : "btn-danger"
            }`}
          >
            {modalType === "logout" ? "Logout" : "Delete"}
          </button>
        </Modal.Footer>
      </Modal>

      <Container fluid className="px-0 catagories-container">
        <div className="catagoies-img">
          <img src="/Images/g-wagon-black.png" alt="" />{" "}
        </div>
        <div className="c-d-1"></div>
        <div className="c-d-2"></div>
        <div className="c-d-3"></div>
        <h1 className="adv-c-heading">User Dashboard</h1>
      </Container>

      <Container fluid>
        <Row>
          {/* Left Column: User Info */}
          <Col xs={12} sm={12} md={3}>
            <Card className="w-100 mt-3 p-3 mb-3">
              <div className="d-flex justify-content-center mb-2">
                <Card.Img
                  src={`${API_URL}/uploads/${userData?.User_img}`}
                  className="user_img"
                />
              </div>
              <h3 style={{ color: "#01B075" }}>{userData?.Name}</h3>
              <hr className="w-75 mx-auto" />
              <p>
                <span className="fw-bold">Email</span>: {userData?.Email}
              </p>
              <p>
                <span className="fw-bold">Birth Date :</span>
                {new Date(userData?.DOB).toLocaleDateString("en-GB", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                })}
              </p>
              <p>
                <span className="fw-bold">Contact No</span>{" "}
                {userData?.ContactNo}
              </p>
              <div className="d-flex gap-2 mb-3">
                <button
                  className="btn text-light"
                  style={{ backgroundColor: "#01B075" }}
                  onClick={() => setModalVisible(true)}
                >
                  Edit info
                </button>
                <button onClick={handleLogoutClick} className="btn btn-primary">
                  Logout
                </button>
              </div>
            </Card>
          </Col>

          {/* Right Column: Ads */}
          <Col xs={12} sm={12} md={9}>
            <h3 className="my-3" style={{ color: "#01B075" }}>
              Posted Advertisements
            </h3>
            {adv.map((item, index) => (
              <Card className="user-item-card mb-3" key={index}>
                <Card.Img
                  className="userdashbord-img"
                  src={`${API_URL}${item.Img}`}
                />
                <Card.Body>
                  <Card.Title>{item?.Name}</Card.Title>
                  <Card.Text>{item?.Description}</Card.Text>
                  <div>
                    <span className="fw-bold">Price</span>: {item?.Price}
                  </div>
                  <div>
                    <span className="fw-bold">City Area</span>:{" "}
                    {item?.City_area_ID.Name}
                  </div>
                  <div className="mt-2 d-flex gap-3">
                    <button
                      onClick={() => handleDeleteClick(item._id)}
                      className="btn btn-danger"
                    >
                      Delete
                    </button>
                    <button
                      className="btn text-light"
                      style={{ backgroundColor: "#01B075" }}
                      onClick={() => {
                        setEditingAdv(item);
                        setShow(true);
                      }}
                    >
                      Edit
                    </button>
                    <button
                      style={{ backgroundColor: "#01B075" }}
                      className="btn text-light"
                      onClick={() => goToCarDetails(item)}
                    >
                      View More
                    </button>
                  </div>
                </Card.Body>
              </Card>
            ))}
          </Col>
        </Row>
      </Container>
    </>
  );
}
