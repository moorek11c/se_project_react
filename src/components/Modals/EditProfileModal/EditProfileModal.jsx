import { useState } from "react";
import "./EditProfileModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { BASE_URL } from "../../../utils/constants";

function EditProfileModal({ activeModal, onClose, onProfileChange }) {
  const [updateProfile, setUpdateProfile] = useState({
    name: "",
    avatar: "",
  });

  const { name, avatar } = updateProfile;

  const handleNameChange = (e) => {
    const { value } = e.target;
    setUpdateProfile({ ...updateProfile, name: value });
  };

  const handleAvatarChange = (e) => {
    const { value } = e.target;
    setUpdateProfile({ ...updateProfile, avatar: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const token = localStorage.getItem("token");
    if (!token) {
      console.log("Token is not provided");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/users/me`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(updateProfile),
      });

      // If the request is successful, update the user in the App component

      if (response.ok) {
        const updatedUser = await response.json();
        onProfileChange(updatedUser); // Update user in App.jsx
        onClose(); // Close the modal
      } else {
        console.error("Error", response.status);
      }
    } catch (error) {
      console.error("Error", error);
    }
  };

  return (
    <div>
      <ModalWithForm
        title="Edit Profile"
        buttonText="Save"
        activeModal={activeModal}
        handleCloseClick={onClose}
        onSubmit={handleSubmit}
      >
        <label className="modal__label" htmlFor="name">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            id="name"
            value={name}
            placeholder="Name"
            onChange={handleNameChange}
            required
          />
        </label>
        <label className="modal__label" htmlFor="avatar">
          Email{" "}
          <input
            type="url"
            className="modal__input"
            id="avatar url"
            placeholder="image URL"
            value={avatar}
            onChange={handleAvatarChange}
            required
          />
        </label>
      </ModalWithForm>
    </div>
  );
}

export default EditProfileModal;
