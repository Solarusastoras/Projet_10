import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditUser from "../EditUser";

const NewUserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEdit = () => {
    setIsEditing(true);
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
  };

  return (
    <div>
      {user && (
        <>
          <button className="edit-button" onClick={handleOpenEdit}>
            Edit Name
          </button>
          {isEditing && <EditUser onClose={handleCloseEdit} />}
        </>
      )}
    </div>
  );
};

export default NewUserProfile;
