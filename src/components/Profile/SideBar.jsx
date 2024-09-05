import { useContext } from "react";
import CurrentUserContext from "../../Contexts/CurrentUserContext";
import "./SideBar.css";
import avatar from "../../assets/images/avatar.svg";

export default function SideBar({ onEditProfileClick, onLogout }) {
  const { currentUser } = useContext(CurrentUserContext);

  // Determine the avatar to display
  const avatarSrc =
    currentUser && currentUser.avatar ? currentUser.avatar : { avatar };

  // Determine the name to display
  const userName = currentUser && currentUser.name ? currentUser.name : "User";

  return (
    <div className="sidebar">
      <div className="sidebar__container">
        <img
          className="sidebar__avatar
        "
          src={avatarSrc}
          alt="User Avatar"
        />

        <h1 className="sidebar__title">{userName}</h1>
      </div>
      <section className="sidebar__btns">
        <button
          onClick={onEditProfileClick}
          type="button"
          className="sidebar__button"
        >
          Edit Profile
        </button>
        <button onClick={onLogout} type="button" className="sidebar__button">
          Logout
        </button>
      </section>
    </div>
  );
}
