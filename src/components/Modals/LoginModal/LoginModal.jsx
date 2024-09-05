import { useState } from "react";

import "./LoginModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";

function LoginModal({ activeModal, onClose, handleLogin }) {
  const [data, setData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setData({ ...data, [id]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    handleLogin(data);
  };

  return (
    <ModalWithForm
      title="login"
      buttonText="login"
      activeModal={activeModal}
      handleCloseClick={onClose}
      onSubmit={handleSubmit}
    >
      <label className="modal__label" htmlFor="email">
        Email{" "}
        <input
          type="email"
          className="modal__input"
          id="email"
          placeholder="Email"
          onChange={handleChange}
          value={data.email}
          required
        />
      </label>
      <label className="modal__label" htmlFor="password">
        Password{" "}
        <input
          type="password"
          className="modal__input"
          id="password"
          placeholder="Password"
          onChange={handleChange}
          value={data.password}
          required
        />
      </label>
    </ModalWithForm>
  );
}

export default LoginModal;
