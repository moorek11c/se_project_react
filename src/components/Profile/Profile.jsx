import { Link } from "react-router-dom";
import "./Profile.css";
import SideBar from "./SideBar.jsx";
import ClothesSection from "./ClothesSection.jsx";

export default function Profile({
  onCardClick,
  clothingItems,
  onAddClothesClick,
}) {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <Link to="/Profile"></Link>
        <SideBar />
        <ClothesSection
          onCardClick={onCardClick}
          clothingItems={clothingItems}
          onAddClothesClick={onAddClothesClick}
        />
      </div>
    </div>
  );
}
