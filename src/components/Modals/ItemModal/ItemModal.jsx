import { useContext } from "react";
import CurrentUserContext from "../../../Contexts/CurrentUserContext";
import closeBtn from "../../../assets/images/CloseBtn.png";
import "./ItemModal.css";

function ItemModal({ activeModal, onClose, card, onDelete }) {
  const { currentUser } = useContext(CurrentUserContext);

  const isLoggedIn = !!currentUser; // Check if user is logged in
  const isOwn = card.owner === currentUser?._id;

  const itemDeleteButtonClassName = `modal__delete-btn ${
    isLoggedIn && isOwn
      ? "modal__delete-btn_visible"
      : "modal__delete-btn_hidden"
  }`;

  return (
    <div className={`modal ${activeModal === "preview" && "modal_opened"}`}>
      <div className="modal__container modal__container_preview">
        <button onClick={onClose} className="modal__close">
          <img src={closeBtn} alt="close button" />
        </button>

        <img src={card.imageUrl} alt={card.name} className="modal__image" />
        <div className="modal__footer">
          <h2 className="modal__caption">{card.name}</h2>
          <p className="modal__weather">Weather: {card.weather}</p>
          {isLoggedIn && isOwn && (
            <button
              className={itemDeleteButtonClassName}
              onClick={() => onDelete(card._id)}
            >
              Delete item
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default ItemModal;
