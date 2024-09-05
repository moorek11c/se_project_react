import { useState, useEffect } from "react";
import "./AddItemModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";

function AddItemModal({ activeModal, onClose, onAddClothesClick, onAddItem }) {
  const [name, setName] = useState("");
  const [imageUrl, setUrl] = useState("");
  const [weather, setWeather] = useState("");
  const [errors, setErrors] = useState({ name: "", imageUrl: "", weather: "" });
  const [isSubmitDisabled, setIsSubmitDisabled] = useState(true);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      name: e.target.value ? "" : "Name is required.",
    }));
  };

  const handleUrlChange = (e) => {
    setUrl(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      imageUrl: e.target.value ? "" : "Image URL is required.",
    }));
  };

  const handleWeatherChange = (e) => {
    setWeather(e.target.value);
    setErrors((prevErrors) => ({
      ...prevErrors,
      weather: e.target.value ? "" : "Please select a weather type.",
    }));
  };

  useEffect(() => {
    const isFormValid = name && imageUrl && weather;
    setIsSubmitDisabled(!isFormValid);
  }, [name, imageUrl, weather]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const formErrors = {
      name: name ? "" : "Name is required.",
      imageUrl: imageUrl ? "" : "Image URL is required.",
      weather: weather ? "" : "Please select a weather type.",
    };

    if (Object.values(formErrors).some((error) => error)) {
      setErrors(formErrors);
    } else {
      onAddItem({ name, imageUrl, weather })
        .then(() => {
          setName("");
          setUrl("");
          setWeather("");
          setErrors({ name: "", imageUrl: "", weather: "" });
          setIsSubmitDisabled(true);

          onClose();
        })
        .catch((err) => {
          console.error("Error adding item:", err);
        });
    }
  };

  return (
    <ModalWithForm
      title="New garment"
      buttonText="Add garment"
      activeModal={activeModal}
      onAddClothesClick={onAddClothesClick}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
      isSubmitDisabled={isSubmitDisabled}
    >
      <label htmlFor="name" className="modal__label">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          placeholder="Name"
          value={name}
          onChange={handleNameChange}
          required
        />
        {errors.name && <span className="modal__error">{errors.name}</span>}
      </label>
      <label htmlFor="imageUrl" className="modal__label">
        Image{" "}
        <input
          type="url"
          className="modal__input"
          name="imageUrl"
          value={imageUrl}
          id="imageUrl"
          onChange={handleUrlChange}
          placeholder="Image URL"
          required
        />
        {errors.imageUrl && (
          <span className="modal__error">{errors.imageUrl}</span>
        )}
      </label>
      <fieldset className="modal__radio-btns">
        <legend className="modal__legend">Select the weather type:</legend>
        <label htmlFor="hot" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="hot"
            value="hot"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            checked={weather === "hot"}
          />{" "}
          Hot
        </label>
        <label htmlFor="warm" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="warm"
            value="warm"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            checked={weather === "warm"}
          />{" "}
          Warm
        </label>
        <label htmlFor="cold" className="modal__label modal__label_type_radio">
          <input
            type="radio"
            id="cold"
            value="cold"
            className="modal__radio-input"
            name="weather"
            onChange={handleWeatherChange}
            checked={weather === "cold"}
          />{" "}
          Cold
        </label>
        {errors.weather && (
          <span className="modal__error">{errors.weather}</span>
        )}
      </fieldset>
    </ModalWithForm>
  );
}

export default AddItemModal;
