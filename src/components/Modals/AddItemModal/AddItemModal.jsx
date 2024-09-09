import "./AddItemModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { addItemModalSchema } from "../../../utils/FormSchemas/ModalSchemas";
import { addItem } from "../../../utils/api";
import { useFormik } from "formik";

function AddItemModal({ activeModal, onClose, onAddClothesClick, onSubmit }) {
  const formik = useFormik({
    initialValues: {
      name: "",
      imageUrl: "",
      weather: "",
    },
    validationSchema: addItemModalSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await addItem(values);

        if (response.message) {
          setErrors({
            name: response.message.includes("Name") ? response.message : "",
            imageUrl: response.message.includes("Image")
              ? response.message
              : "",
            weather: response.message.includes("Weather")
              ? response.message
              : "",
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
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onAddClothesClick={onAddClothesClick}
      handleCloseClick={onClose}
      onSubmit={(e) => {
        console.log("Form Submit Triggered"); // Log to check when this is called
        e.preventDefault(); // Prevent default form submission
        formik.handleSubmit(e); //Formik's handleSubmit
      }}
      isSubmitDisabled={!(formik.isValid && formik.dirty)} // Disable when form is not valid or not dirty
      modalType="add-item-modal"
    >
      <label htmlFor="name" className="modal__label modal__label-type-input">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          required
        />
        {formik.errors.name && formik.touched.name && (
          <span className="modal__error">{formik.errors.name}</span>
        )}{" "}
      </label>
      <label
        htmlFor="imageUrl"
        className="modal__label modal__label-type-input"
      >
        Image{" "}
        <input
          type="url"
          className={`modal__input ${
            formik.errors.email && formik.touched.email ? "modal__error" : ""
          }`}
          name="imageUrl"
          id="imageUrl"
          placeholder="Image URL"
          value={formik.values.imageUrl}
          onChange={formik.handleChange}
          required
        />
        {formik.errors.imageUrl && formik.touched.imageUrl && (
          <span className="modal__error">{formik.errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            name="weather"
            className="modal__radio-input"
            onChange={formik.handleChange}
            checked={formik.values.weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            className="modal__radio-input"
            name="weather"
            onChange={formik.handleChange}
            checked={formik.values.weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            value="cold"
            className="modal__radio-input"
            name="weather"
            onChange={formik.handleChange}
            checked={formik.values.weather === "cold"}
          />{" "}
          Cold
        </label>
        {formik.errors.weather && formik.touched.weather && (
          <span className="modal__error">{formik.errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
