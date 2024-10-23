import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditUser from "../EditUser";

const NewUserProfile = ({ onEditNameClick, onCancelClick }) => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);
  const [showEditButton, setShowEditButton] = useState(true);

  const handleOpenEdit = () => {
    setIsEditing(true);
    // Cacher le bouton "Edit Name"
    setShowEditButton(false); 
     // Appeler la fonction pour modifier la page utilisateur
    onEditNameClick();
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    // Réafficher le bouton "Edit Name" si nécessaire
    setShowEditButton(true); 
    // Appeler la fonction pour réafficher le contenu masqué
    onCancelClick(); 
  };

  return (
    <div>
      {user && (
        <>
          {showEditButton && (
            <button className="edit-button" onClick={handleOpenEdit}>
              Edit Name
            </button>
          )}
          {isEditing && (
            <div>
              <EditUser onClose={handleCloseEdit} />
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewUserProfile;