import { useContext } from "react";
import { Modal, Button as RBButton } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextField, Button, Box, Typography } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";

export default function SignupModal({ show, onClose }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();

  const onSubmit = (data) => {
    try {
      const formData = new FormData();
      formData.append("Name", data.Name);
      formData.append("Email", data.Email);
      formData.append("Password", data.Password);
      formData.append("DOB", data.DOB);
      formData.append("ContactNo", data.ContactNo);

      if (data.User_img && data.User_img.length > 0) {
        formData.append("User_img", data.User_img[0]);
      }

      fetch("http://localhost:4500/api/user/signup", {
        method: "POST",
        body: formData,
      })
        .then(async (res) => {
          const resData = await res.json();
          if (res.ok) {
            toast.success("✅ User created successfully!", {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
              style: {
                backgroundColor: "#01B075",
                color: "#fff",
                fontWeight: "bold",
              },
            });
            onClose();
            
            // Redirect after 4 seconds
            setTimeout(() => {
              navigate("/otp-varification", { state: { email: data.Email , userId: resData.userId} });
            }, 2500);
          } else {
            toast.error(`❌ Signup failed: ${resData.message || res.status}`, {
              position: "top-right",
              autoClose: 3000,
              theme: "colored",
            });
          }
        })
        .catch((err) => {
          toast.error("⚠️ Error: " + err.message, {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          });
        });
    } catch (err) {
      toast.error("⚠️ Unexpected Error: " + err.message, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  return (
    <>
      <Modal show={show} onHide={onClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ display: "flex", flexDirection: "column", gap: 2 }}
          >
            <Typography variant="h6" align="center">
              Create Account
            </Typography>

            <TextField
              label="Name"
              {...register("Name", {
                required: "Name is required",
                minLength: 3,
              })}
              error={!!errors.Name}
              helperText={errors.Name?.message}
              fullWidth
            />

            <TextField
              label="Email"
              type="email"
              {...register("Email", {
                required: "Email is required",
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: "Invalid email format",
                },
              })}
              error={!!errors.Email}
              helperText={errors.Email?.message}
              fullWidth
            />

            <TextField
              label="Password"
              type="password"
              {...register("Password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Minimum 6 characters",
                },
              })}
              error={!!errors.Password}
              helperText={errors.Password?.message}
              fullWidth
            />

            <TextField
              label="Date of Birth"
              type="date"
              InputLabelProps={{ shrink: true }}
              {...register("DOB", { required: "DOB is required" })}
              error={!!errors.DOB}
              helperText={errors.DOB?.message}
              fullWidth
            />

            <TextField
              label="Contact Number"
              {...register("ContactNo", {
                required: "Contact number is required",
                pattern: {
                  value: /^[0-9]{10,15}$/,
                  message: "Enter a valid contact number",
                },
              })}
              error={!!errors.ContactNo}
              helperText={errors.ContactNo?.message}
              fullWidth
            />

            <input
              type="file"
              {...register("User_img", { required: "Image is required" })}
            />
            {errors.User_img && (
              <span style={{ color: "red", fontSize: "13px" }}>
                {errors.User_img.message}
              </span>
            )}

            <Button variant="contained" type="submit" color="primary">
              Sign Up
            </Button>
          </Box>
        </Modal.Body>
      </Modal>
    </>
  );
}
