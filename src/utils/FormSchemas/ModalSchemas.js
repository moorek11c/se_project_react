import * as Yup from "yup";

export const SignUpModalSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
  name: Yup.string().required("Name is required"),
  avatar: Yup.string().url("Invalid url").required("Avatar is required"),
});

export const loginModalSchema = Yup.object().shape({
  email: Yup.string().email("Invalid email").required("Email is required"),
  password: Yup.string().required("Password is required"),
});

export const addItemModalSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  imageUrl: Yup.string().url("Invalid url").required("Image URL is required"),
  weather: Yup.string().required("Weather is required"),
});

export const editProfileModalSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  avatar: Yup.string().url("Invalid url").required("Avatar is required"),
});
