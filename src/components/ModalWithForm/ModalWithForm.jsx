import closeBtn from "../../assets/images/CloseBtn.png";
import "./ModalWithForm.css";

function ModalWithForm({
  children,
  buttonText,
  title,
  isOpened,
  closeModalClick,
}) {
  return (
    <div className={`modal ${isOpened && "modal_opened"}`}>
      <div className="modal__container">
        <h2 className="modal__title">{title}</h2>
        <button onClick={closeModalClick} className="modal__close">
          <img src={closeBtn} alt="close button" />
        </button>
        <form className="modal__form">
          {children}
          <button type="submit" className="modal__submit-btn">
            {buttonText}
          </button>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
