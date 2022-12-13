import * as React from "react";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Modal from "@mui/material/Modal";
import { FormControl, FormGroup, TextField } from "@mui/material";
import { styled } from "@mui/system";
import { useFormik } from "formik";
import * as yup from "yup";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "0px solid #000",
  borderRadius: "20px",
  boxShadow: 24,
  p: 4,
};

const MyForm = styled(FormGroup)({
  width: "100%",
  gap: 2,
});
const MyFormControl = styled(FormControl)({
  marginTop: 10,
});

const validationSchema = yup.object({
  title: yup.string().required("Required"),
  author: yup.string().required("Required"),
  body: yup.string().required("Required"),
});
export default function Create() {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const url = "http://localhost:3002/articles";
  const formik = useFormik({
    initialValues: {
      title: "",
      author: "",
      body: "",
    },
    onSubmit: (values, { resetForm }) => {
      console.log("fhdgssgsdfgsdg", values);
      axios
        .post(url, values)
        .then((res) => {
          console.log("object", res.data);
          resetForm();
        })
        .catch((err) => {
          console.log("first", err.message);
          resetForm();
        });
    },
    validationSchema,
  });

  return (
    <div>
      <Button variant="contained" color="secondary" onClick={handleOpen}>
        Create
      </Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <MyForm component="form" onSubmit={formik.handleSubmit}>
            <MyFormControl>
              <TextField
                fullWidth
                id="title"
                name="title"
                label="Title "
                onChange={formik.handleChange}
                value={formik.values.title}
                error={formik.touched.title && Boolean(formik.errors.title)}
                helperText={formik.touched.title && formik.errors.title}
                onBlur={formik.handleBlur}
              />
            </MyFormControl>
            <MyFormControl>
              <TextField
                fullWidth
                id="author"
                name="author"
                label="Author "
                onChange={formik.handleChange}
                value={formik.values.author}
                error={formik.touched.author && Boolean(formik.errors.author)}
                helperText={formik.touched.author && formik.errors.author}
                onBlur={formik.handleBlur}
              />
            </MyFormControl>
            <MyFormControl>
              <TextField
                fullWidth
                id="body"
                name="body"
                label="Body "
                onChange={formik.handleChange}
                value={formik.values.body}
                error={formik.touched.body && Boolean(formik.errors.body)}
                helperText={formik.touched.body && formik.errors.body}
                onBlur={formik.handleBlur}
              />
            </MyFormControl>
            <MyFormControl>
              <Button
                onClick={formik.handleSubmit}
                type="submit"
                variant="contained"
                color="secondary"
                sx={{
                  width: { xs: "100%", lg: "20%" },
                  marginTop: 5,
                  align: "left",
                }}
              >
                Submit
              </Button>
            </MyFormControl>
          </MyForm>
        </Box>
      </Modal>
    </div>
  );
}
