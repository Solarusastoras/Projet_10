import React, { useState } from "react";
import { useSelector } from "react-redux";
import EditUser from "../EditUser";
import "./_button_update_username.scss";

const NewUserProfile = ({ onEditNameClick, onCancelClick }) => {
  const { user } = useSelector((state) => state.auth);
  const [isEditing, setIsEditing] = useState(false);

  const handleOpenEdit = () => {
    setIsEditing(true);
    onEditNameClick();
  };

  const handleCloseEdit = () => {
    setIsEditing(false);
    onCancelClick();
  };

  return (
    <div>
      {user && (
        <>
          {!isEditing ? (
            <button className="button_editname_color" onClick={handleOpenEdit}>Edit Name</button>
          ) : (
            <EditUser onClose={handleCloseEdit} />
          )}
        </>
      )}
    </div>
  );
};

export default NewUserProfile;