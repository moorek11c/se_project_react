import "./EditProfileModal.css";
import ModalWithForm from "../../ModalWithForm/ModalWithForm";
import { editProfileModalSchema } from "../../../utils/FormSchemas/ModalSchemas";
import { useFormik } from "formik";
import { editProfile } from "../../../utils/auth";
import { useContext } from "react";
import currentUserContext from "../../../Contexts/CurrentUserContext";

function EditProfileModal({ activeModal, onClose, onSubmit }) {
  const { _id } = useContext(currentUserContext);
  const formik = useFormik({
    initialValues: {
      id: _id,
      name: "",
      avatar: "",
    },
    validationSchema: editProfileModalSchema,
    validateOnChange: true,
    validateOnBlur: true,

    onSubmit: async (values, { setErrors, resetForm }) => {
      try {
        const response = await editProfile(values);

        if (response.message) {
          setErrors({
            name: response.message.includes("Name") ? response.message : "",
            avatar: response.message.includes("Avatar") ? response.message : "",
          });
        } else {
          console.log("Successful Profile Edit");
          onSubmit(values);
          resetForm();
          onClose();
        }
      } catch (error) {
        console.error("An unexpected error occurred:", error);
      }
    },
  });

  return (
    <div>
      <ModalWithForm
        title="Edit Profile"
        buttonText="Save Changes"
        activeModal={activeModal}
        handleCloseClick={onClose}
        onSubmit={(e) => {
          e.preventDefault();
          formik.handleSubmit(e);
        }}
        isSubmitDisabled={!(formik.isValid && formik.dirty)}
        modalType="profile-edit-modal"
      >
        <label className="modal__label" htmlFor="name">
          Name{" "}
          <input
            type="text"
            className="modal__input"
            name="name"
            id="edit-name"
            value={formik.values.name}
            placeholder="Name"
            onChange={formik.handleChange}
            required
          />
        </label>
        <label className="modal__label" htmlFor="avatar">
          Avatar{" "}
          <input
            type="url"
            className="modal__input"
            id="avatar-Url"
            placeholder="image URL"
            name="avatar"
            value={formik.values.avatar}
            onChange={formik.handleChange}
            required
          />
        </label>
      </ModalWithForm>
    </div>
  );
}

export default EditProfileModal;
