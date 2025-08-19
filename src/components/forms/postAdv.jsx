import { useEffect, useState } from "react";
import { Modal, Form } from "react-bootstrap";
import { useForm } from "react-hook-form";
import { TextField, Button, Box } from "@mui/material";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";
const API_URL = import.meta.env.VITE_API_URL;

export default function PostAdvertisment({ show, onClose, initialData }) {
  const [city, setCity] = useState([]);
  const [category, setCategory] = useState([]);
  const [type, setType] = useState([]);
  let userId = useSelector((state) => state.userInfo.userInfo?.ID) || null;

  useEffect(() => {
    fetch(`${API_URL}/api/city_area`)
      .then((res) => res.json())
      .then((data) => setCity(data))
      .catch((err) => console.error(`city fetch err ${err}`));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/catagory`)
      .then((res) => res.json())
      .then((data) => setCategory(data))
      .catch((err) => console.error(`fetching error ${err}`));
  }, []);

  useEffect(() => {
    fetch(`${API_URL}/api/types`)
      .then((res) => res.json())
      .then((data) => setType(data))
      .catch((err) => console.error(`fetching error ${err}`));
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const formData = new FormData();

      // Append all fields
      for (let key in data) {
        if (key === "Img") {
          if (data.Img && data.Img.length > 0) {
            formData.append("Img", data.Img[0]); // only append if new image selected
          }
        } else {
          formData.append(key, data[key]);
        }
      }

      formData.append("User_ID", userId);

      let url = `${API_URL}/api/advertisment`;
      let method = "POST";

      if (initialData && initialData._id) {
        url = `${API_URL}/api/advertisment/${initialData._id}`;
        method = "PUT";
      }

      const res = await fetch(url, {
        method,
        body: formData,
      });

      if (res.ok) {
        toast.success(
          `✅ Advertisement ${
            initialData ? "updated" : "posted"
          } successfully!`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
            style: {
              backgroundColor: "#01B075",
              color: "#fff",
              fontWeight: "bold",
            },
          }
        );

        setTimeout(() => {
          onClose();
        }, 1500);
      } else {
        const errorMsg = await res.text();
        toast.error(
          `⚠️ Failed to ${initialData ? "update" : "post"}: ${errorMsg}`,
          {
            position: "top-right",
            autoClose: 3000,
            theme: "colored",
          }
        );
      }
    } catch (err) {
      toast.error(`⚠️ Error: ${err.message}`, {
        position: "top-right",
        autoClose: 3000,
        theme: "colored",
      });
    }
  };

  useEffect(() => {
    if (initialData) {
      setValue("Name", initialData.Name || "");
      setValue("Price", initialData.Price || "");
      setValue("Description", initialData.Description || "");
      setValue("Feature", initialData.Feature || "");
      setValue("starts_on", initialData.starts_on?.split("T")[0] || ""); // format date for <input type="date">
      setValue("Ends_on", initialData.Ends_on?.split("T")[0] || "");

      setValue(
        "Catagory_ID",
        initialData.Catagory_ID?._id || initialData.Catagory_ID || ""
      );
      setValue(
        "City_area_ID",
        initialData.City_area_ID?._id || initialData.City_area_ID || ""
      );
      setValue(
        "Type_ID",
        initialData.Type_ID?._id || initialData.Type_ID || ""
      );
    }
  }, [initialData, setValue]);

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton className="text-success fw-bold">
        Post Advertisement
      </Modal.Header>
      <Modal.Body>
        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          noValidate
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Name */}
          <TextField
            label="Name"
            {...register("Name", {
              required: "This field is required",
              minLength: { value: 6, message: "Minimum length is 6" },
              maxLength: {
                value: 50,
                message: "Maximum 50 characters allowed",
              },
            })}
            error={!!errors.Name}
            helperText={errors.Name?.message}
          />

          {/* Price */}
          <TextField
            label="Price"
            type="number"
            {...register("Price", {
              required: "This field is required",
              min: { value: 1, message: "Price must be at least 1" },
            })}
            error={!!errors.Price}
            helperText={errors.Price?.message}
          />

          {/* Description */}
          <TextField
            label="Description"
            multiline
            {...register("Description", {
              required: "This field is required",
              minLength: {
                value: 10,
                message: "Description must be at least 10 characters",
              },
            })}
            error={!!errors.Description}
            helperText={errors.Description?.message}
          />

          {/* Feature */}
          <TextField
            label="Feature"
            multiline
            {...register("Feature", {
              required: "This field is required",
              minLength: { value: 10, message: "Minimum length is 10" },
            })}
            error={!!errors.Feature}
            helperText={errors.Feature?.message}
          />

          {/* Dates */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Form.Control type="date" {...register("starts_on")} />
            <Form.Control type="date" {...register("Ends_on")} />
          </Box>

          {/* Selects */}
          <Box sx={{ display: "flex", gap: 2 }}>
            <Form.Select {...register("Catagory_ID")}>
              <option value="">Select Category</option>
              {category.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.Name}
                </option>
              ))}
            </Form.Select>

            <Form.Select {...register("City_area_ID")}>
              <option value="">Select City Area</option>
              {city.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.Name}
                </option>
              ))}
            </Form.Select>
          </Box>

          <Box sx={{ display: "flex", gap: 2 }}>
            <Form.Select {...register("Type_ID")}>
              <option value="">Select Type</option>
              {type.map((item) => (
                <option key={item._id} value={item._id}>
                  {item.Name}
                </option>
              ))}
            </Form.Select>
          </Box>

          {/* Image */}
          <TextField
            type="file"
            inputProps={{ accept: "image/*" }}
            {...register("Img", {
              required: !initialData ? "Image is required" : false,
            })}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            disabled={isSubmitting}
          >
            Post Advertisement
          </Button>
        </Box>
      </Modal.Body>
    </Modal>
  );
}
