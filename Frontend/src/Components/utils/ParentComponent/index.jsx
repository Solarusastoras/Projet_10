import React, { useState } from "react";
import Account from "./Account";
import "./_parentComponent.scss";

const ParentComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNameClick = () => {
    setIsEditing((prev) => !prev); // Utilisation de la fonction de mise à jour
  };

  return (
    <div>
      <button className="edit-button" onClick={handleEditNameClick}>
        {isEditing ? "Cancel" : "Edit Name"}{" "}
        {/* Changement de texte dynamique */}
      </button>
      <Account isEditing={isEditing} />
    </div>
  );
};

export default ParentComponent;
