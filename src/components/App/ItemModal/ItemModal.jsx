import closeBtn from "../../../assets/CloseBtn.png";
import "./ItemModal.css";

function ItemModal({ activModal, closeModalClick, card }) {
  return (
    <div className={`modal ${activModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_preview">
        <button onClick={closeModalClick} className="modal__close">
          <img src={closeBtn} alt="close button" />
        </button>

        <img
          src={card.link}
          alt={card.name}
          className="modal__image"
          onClick={closeModalClick}
        />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
