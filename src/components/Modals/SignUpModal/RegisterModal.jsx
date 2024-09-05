import React, { useState } from "react";
import "./RegisterModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";

function SignUpModal({ activeModal, onClose, onSubmit }) {
  const [data, setData] = useState({
    email: "",
    password: "",
    name: "",
    avatar: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(data);
    onClose();
  };

  return (
    <ModalWithForm
      title="Sign Up"
      buttonText="sign up"
      activeModal={activeModal}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          type="email"
          name="email"
          className="modal__input"
          id="email"
          value={data.email}
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        <input
          type="password"
          name="password"
          className="modal__input"
          id="password"
          value={data.password}
          onChange={handleChange}
          placeholder="Password"
          required
        />
      </label>
      <label className="modal__label" htmlFor="name">
        Name{" "}
        <input
          type="text"
          className="modal__input"
          id="name"
          name="name"
          value={data.name}
          placeholder="Name"
          onChange={handleChange}
          required
        />
      </label>
      <label className="modal__label" htmlFor="avatar">
        Avatar{" "}
        <input
          type="url"
          className="modal__input"
          id="avatar"
          name="avatar"
          value={data.avatar}
          onChange={handleChange}
          placeholder="Avatar URL"
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default SignUpModal;
