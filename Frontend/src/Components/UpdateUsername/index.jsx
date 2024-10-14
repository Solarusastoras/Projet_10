import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserModal from "../utils/UserModal";
import UpdateUsername from "../UpdateUsername";

const NewUserProfile = () => {
  const { user } = useSelector((state) => state.auth);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div>
      {user && (
        <>
          <button className="edit-button" onClick={handleOpenModal}>
            Edit Name
          </button>
          <UserModal isOpen={isModalOpen} onClose={handleCloseModal}>
            <UpdateUsername onClose={handleCloseModal} />
          </UserModal>
        </>
      )}
    </div>
  );
};

export default NewUserProfile;
