import { useFormik } from "formik";

import "./LoginModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { loginModalSchema } from "../../../utils/FormSchemas/ModalSchemas";
import { login } from "../../../utils/auth";

function LoginModal({ activeModal, onClose, onSubmit, openSignup }) {
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: loginModalSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await login(values);

        if (response.message) {
          setErrors({
            email: response.message.includes("Email") ? response.message : "",
            password: response.message.includes("Password")
              ? response.message
              : "",
          });
        } else {
          console.log("Successful Login");
          onSubmit(values);
          resetForm();
          onClose();
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <ModalWithForm
      title="Login"
      buttonText="Log in"
      activeModal={activeModal}
      handleCloseClick={onClose}
      onSubmit={(e) => {
        console.log("Form Submit Triggered");
        e.preventDefault();
        formik.handleSubmit(e);
      }}
      isSubmitDisabled={!(formik.isValid && formik.dirty)} // Disable when form is not valid or not dirty
      modalType="login-modal"
    >
      <label className="modal__label" htmlFor="email-login">
        Email{" "}
        <input
          type="email"
          name="email"
          id="email-login"
          placeholder="Enter your email!"
          className={`modal__input ${
            formik.errors.email && formik.touched.email ? "modal__error" : ""
          }`}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.email}
          required
        />
        {formik.errors.email && formik.touched.email && (
          <span className="modal__error">{formik.errors.email}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="password-login">
        Password{" "}
        <input
          type="password"
          id="password-login"
          name="password"
          className={`modal__input ${
            formik.errors.password && formik.touched.password
              ? "modal__error"
              : ""
          }`}
          placeholder="Password"
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.password}
          required
        />
      </label>
      {formik.errors.password && formik.touched.password && (
        <span className="modal__error">{formik.errors.password}</span>
      )}
      <button
        onClick={openSignup}
        type="button"
        className="modal__button_signup"
      >
        or Sign Up
      </button>
    </ModalWithForm>
  );
}

export default LoginModal;
