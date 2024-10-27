import React, { useState } from "react";
import NewUserProfile from "../UpdateUsername";
import Account from "../Account";
import Header from "../Header";

const ParentComponent = () => {
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNameClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <>
      <Header isEditing={isEditing} />
      <NewUserProfile
        onEditNameClick={handleEditNameClick}
        onCancelClick={handleCancelClick}
      />
      <Account />
    </>
  );
};

export default ParentComponent;