import { useNavigate } from "react-router-dom";
import { Modal } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch } from "react-redux";
import { setUserInfo } from "../../slices/userSlice";

export default function LoginModal({ show, onClose }) {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  const dispatch = useDispatch();

  const onSubmit = async (data) => {
    try {
      const payload = {
        Email: data.Email,
        Password: data.password,
      };

      const response = await fetch("http://localhost:4500/api/user/login", {
        method: "POST",
        body: JSON.stringify(payload),
        headers: {
          "Content-Type": "application/json; charset=UTF-8",
        },
      });

      const resData = await response.json();

      if (!response.ok) {
        throw new Error(resData.message || "Login failed");
      }

      toast.success("✅ Login successful!", {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
        style: {
          backgroundColor: "#01B075",
          color: "#fff",
          fontWeight: "bold",
        },
      });
      console.log(resData);
      dispatch(setUserInfo({ ...resData }));
      onClose();

      setTimeout(() => {
        navigate("/UserDashboard", { state: { email: data.Email } });
      }, 1500);
    } catch (err) {
      toast.error(`⚠️ Error: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
      console.error("Login error:", err);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Login</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 2,
            padding: 1,
          }}
        >
          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            {...register("Email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email address",
              },
            })}
            error={!!errors.Email} // Changed from errors.email
            helperText={errors.Email?.message}
          />

          <TextField
            label="Password"
            type="password"
            variant="outlined"
            fullWidth
            {...register("password", {
              required: "Password is required",
              minLength: {
                value: 6,
                message: "Minimum 6 characters",
              },
            })}
            error={!!errors.password}
            helperText={errors.password?.message}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            disabled={isSubmitting}
          >
            {isSubmitting ? "Logging in..." : "Login"}
          </Button>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
