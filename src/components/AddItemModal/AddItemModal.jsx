import "./AddItemModal.css";
import ModalWithForm from "../ModalWithForm/ModalWithForm";

function AddItemModal({ closeModalClick, isOpened }) {
  return (
    <div>
      <ModalWithForm
        title="New garment"
        buttonText="Add garment"
        isOpened={isOpened}
        closeModalClick={closeModalClick}
      >
        <label htmlFor="name" className="modal__label">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            placeholder="Name"
          />
        </label>
        <label htmlFor="imageUrl" className="modal__label">
          Image{" "}
          <input
            type="url"
            className="modal__input"
            id="imageUrl"
            placeholder="Image URL"
          />
        </label>
        <fieldset className="modal__radio-btns">
          <legend className="modal__legend">Select the weather type:</legend>
          <label htmlFor="hot" className="modal__label modal__label_type_radio">
            <input
              type="radio"
              id="hot"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Hot
          </label>
          <label
            htmlFor="warm"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="warm"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Warm
          </label>
          <label
            htmlFor="cold"
            className="modal__label modal__label_type_radio"
          >
            <input
              type="radio"
              id="cold"
              className="modal__radio-input"
              name="weather"
            />{" "}
            Cold
          </label>
        </fieldset>
      </ModalWithForm>
    </div>
  );
}

export default AddItemModal;
