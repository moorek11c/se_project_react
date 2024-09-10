import { useContext } from "react";
import "./ItemCard.css";
import cardLikeBtn from "../../../assets/images/Like button.svg";
import unLike from "../../../assets/images/unLikeBtn.svg";
import CurrentUserContext from "../../../Contexts/CurrentUserContext.jsx";

function ItemCard({ item, onCardClick, onCardLike, isLoggedIn }) {
  const { currentUser } = useContext(CurrentUserContext);

  const handleCardClick = () => {
    onCardClick(item);
  };

  const handleLike = () => {
    onCardLike({ _id: item._id, isLiked: isLiked });
  };

  // Check if item.likes exists, user is logged in, and likes should be shown
  const isLiked =
    isLoggedIn &&
    Array.isArray(item.likes) &&
    item.likes.some((id) => id === currentUser._id);

  const itemLikeButton = `card__like-btn ${
    isLiked ? "card__like-btn_active" : ""
  }`;

  return (
    <li className="card">
      <div className="card__description">
        <h2 className="card__title">{item.name}</h2>
        {isLoggedIn && item.likes && (
          <img
            onClick={handleLike}
            className={itemLikeButton}
            src={isLiked ? cardLikeBtn : unLike}
            alt="like button"
          />
        )}
      </div>
      <img
        onClick={handleCardClick}
        className="card__image"
        src={item.imageUrl}
        alt={item.name}
      />
    </li>
  );
}

export default ItemCard;
