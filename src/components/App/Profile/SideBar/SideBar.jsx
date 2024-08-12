import React from "react";
import "./SideBar.css";
import avatar from "../../../../assets/avatar.svg";

export default function SideBar() {
  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar
        "
          src={avatar}
          alt="avatar"
        />

        <h1 className="sidebar__title">Ryan Moore</h1>
      </div>
    </div>
  );
}
