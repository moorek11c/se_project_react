import "./RegisterModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { SignUpModalSchema } from "../../../utils/FormSchemas/ModalSchemas";
import { useFormik } from "formik";
import { register } from "../../../utils/auth";

function SignUpModal({ activeModal, onClose, onSubmit, openLogin }) {
  // Initialize Formik
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      avatar: "",
    },
    validationSchema: SignUpModalSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await register(values);

        if (response.message) {
          setErrors({
            email: response.message.includes("Email") ? response.message : "",
          });
        } else {
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
      title="Sign Up"
      buttonText="sign up"
      activeModal={activeModal}
      handleCloseClick={onClose}
      onSubmit={(e) => {
        e.preventDefault(); // Prevent default form submission
        formik.handleSubmit(e); // Use Formik's handleSubmit
      }} // Formik's handleSubmit
      isSubmitDisabled={!(formik.isValid && formik.dirty)} // Disable when form is not valid or not dirty
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          type="email"
          name="email"
          id="email"
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
      <label className="modal__label" htmlFor="password-signup">
        Password{" "}
        <input
          type="password"
          name="password"
          id="password-signup"
          className={`modal__input ${
            formik.errors.password && formik.touched.password
              ? "modal__error"
              : ""
          }`}
          placeholder="Please enter a valid password"
          value={formik.values.password}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.password && formik.touched.password && (
          <span className="modal__error">{formik.errors.password}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="name-signup">
        Name{" "}
        <input
          type="text"
          name="name"
          id="name-signup"
          className={`modal__input ${
            formik.errors.name && formik.touched.name ? "modal__error" : ""
          }`}
          placeholder="Enter your name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.name && formik.touched.name && (
          <span className="modal__error">{formik.errors.name}</span>
        )}
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar{" "}
        <input
          type="url"
          name="avatar"
          id="avatar"
          className={`modal__input ${
            formik.errors.avatar && formik.touched.avatar ? "modal__error" : ""
          }`}
          placeholder="Enter your avatar Url"
          value={formik.values.avatar}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.avatar && formik.touched.avatar && (
          <span className="modal__error">{formik.errors.avatar}</span>
        )}
      </label>
      <button onClick={openLogin} type="button" className="modal__button_login">
        or Log In
      </button>
    </ModalWithForm>
  );
}

export default SignUpModal;
