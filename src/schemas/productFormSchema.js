import * as Yup from "yup"; 

export const userValidationSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  email: Yup.string().email("Invalid email").required("Email is required"),
  phone: Yup.string().required("Phone is required"),
  city: Yup.string().required("City is required"),
  zipCode: Yup.string().required("Zip code is required"),
});
