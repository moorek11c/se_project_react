import "./ClothesSection.css";
import { defaultClothingItems } from "../../../utils/constants.js";
import ItemCard from "../../Main/ItemCard/ItemCard.jsx";

export default function ClothesSection({ onCardClick }) {
  return (
    <div className="clothes__section">
      <div className="clothes-section__wrapper">
        <div className="clothes-section__info">
          <h1 className="clothes-section__title">Your items</h1>
          <button className="clothes-section__add-btn" type="button">
            +Add new
          </button>
        </div>
        <ul className="clothes-section__list">
          {defaultClothingItems.map((item) => {
            return (
              <ItemCard key={item._id} item={item} onCardClick={onCardClick} />
            );
          })}
        </ul>
      </div>
    </div>
  );
}
