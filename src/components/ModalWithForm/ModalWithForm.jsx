import closeBtn from "../../assets/images/CloseBtn.png";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  activeModal,
  handleCloseClick,
  onSubmit,
  isSubmitDisabled,
  modalType,
}) {
  return (
    <div className={`modal ${activeModal ? "modal_opened" : ""}`}>
      <div className={`modal__container ${modalType}`}>
        <h2 className="modal__title">{title}</h2>
        <button
          type="button"
          className="modal__close"
          onClick={handleCloseClick}
        >
          <img src={closeBtn} alt="close button" />
        </button>
        <form onSubmit={onSubmit} className="modal__form">
          {children}
          <button
            disabled={isSubmitDisabled}
            type="submit"
            className={`modal__submit-btn ${
              isSubmitDisabled ? "modal__submit-btn_disabled" : ""
            }`}
          >
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
