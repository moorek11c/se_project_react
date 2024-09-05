import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";

import "./ClothesSection.css";
import ItemCard from "../Main/ItemCard/ItemCard";

export default function ClothesSection({
  onCardClick,
  clothingItems,
  onAddClothesClick,
}) {
  const { currentUser } = useContext(CurrentUserContext);

  const userClothingItems = clothingItems.filter(
    (item) => item.owner === currentUser._id
  );

  return (
    <div className="clothes__section">
      <div className="clothes-section__wrapper">
        <div className="clothes-section__info">
          <h1 className="clothes-section__title">Your items</h1>
          <button
            onClick={onAddClothesClick}
            className="clothes-section__add-btn"
            type="button"
          >
            +Add new
          </button>
        </div>
        <ul className="clothes-section__list">
          {userClothingItems.length > 0 ? (
            userClothingItems.map((item) => (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            ))
          ) : (
            <p className="clothes-section__no-items">No items found</p>
          )}
        </ul>
      </div>
    </div>
  );
}
