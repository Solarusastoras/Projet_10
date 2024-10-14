import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateUserProfileUsername } from '../../Form/authSlice';
import './_usermodal.scss';

const UserModal = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const { user, loading, error } = useSelector((state) => state.auth);
  const [newUsername, setNewUsername] = useState(user?.userName || '');

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateUserProfileUsername({ newUsername }));
    onClose(); // Fermer la modale après la soumission
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <button className="close-button" onClick={onClose}>X</button>
        <form onSubmit={handleSubmit}>
          <p>New Username</p>
          <input
            className="new_username"
            type="text"
            placeholder="New Username"
            value={newUsername}
            onChange={(e) => setNewUsername(e.target.value)}
            required
          />
          <br />
          <button type="submit" className="edit-button">Submit</button>
        </form>
        {loading && <p>Updating...</p>}
        {error && <p className="error">{error}</p>}
      </div>
    </div>
  );
};

export default UserModal;