import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { updateUserProfileUsername } from "../../Store/AuthSlice";
import useUsername from "../utils/use_username";
import "./_edituser.scss";

const EditUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [username, setUsername] = useUsername();
  const [newUsername, setNewUsername] = useState(username);
  const [firstName, setFirstName] = useState(user?.firstName || "");
  const [lastName, setLastName] = useState(user?.lastName || "");

  useEffect(() => {
    if (user) {
      setNewUsername(user.userName || "");
      setFirstName(user.firstName || "");
      setLastName(user.lastName || "");
    }
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileUsername({ newUsername }))
      .unwrap()
      .then(() => {
        setUsername(newUsername); // Met à jour le hook personnalisé
        onClose();
      })
      .catch((error) => {
        console.error("Failed to update user info:", error);
      });
  };

  return (
    <div>
      <p>Edit user info</p>
      <form onSubmit={handleSubmit}>
        <label htmlFor="username">Username:</label>
        <input
          id="username"
          className="new_username"
          type="text"
          placeholder="New Username"
          value={newUsername}
          onChange={(e) => setNewUsername(e.target.value)}
          required
        />
        <br />
        <label htmlFor="firstname">First Name:</label>
        <input
          id="firstname"
          className="new_username"
          type="text"
          placeholder="First name"
          value={firstName}
          disabled
        />
        <br />
        <label htmlFor="lastname">Last Name:</label>
        <input
          id="lastname"
          className="new_username"
          type="text"
          placeholder="Last name"
          value={lastName}
          disabled
        />
        <br />
        <button type="submit" className="edit-button - marge_d - edit-buttons">
          Save
        </button>
        <button
          type="button"
          className="edit-button - edit-buttons"
          onClick={onClose}
        >
          Cancel
        </button>
      </form>
      {loading && <p>Updating...</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};

export default EditUser;
