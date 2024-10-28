import React, { useState } from "react";
import Account from "./Account";
import "./_parentComponent.scss";

const ParentComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNameClick = () => {
    setIsEditing(!isEditing);
  };

  return (
    <div>
      <button className="edit-button" onClick={handleEditNameClick}>
        Edit Name
      </button>
      <Account isEditing={isEditing} />
    </div>
  );
};

export default ParentComponent;