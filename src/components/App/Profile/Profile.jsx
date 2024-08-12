import { useState } from "react";

import { Link } from "react-router-dom";
import "./Profile.css";
import SideBar from "./SideBar/SideBar.jsx";
import ClothingSection from "./ClothingSection/ClothesSection.jsx";

export default function Profile() {
  return (
    <div className="profile">
      <div className="profile__wrapper">
        <Link to="/Profile"></Link>
        <SideBar />
        <ClothingSection />
      </div>
    </div>
  );
}
