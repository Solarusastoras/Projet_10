import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserProfile } from "../../Store/AuthAction.js";
import { useNavigate } from "react-router-dom";
import "./_userprofile.scss"; // Assurez-vous d'importer le fichier SCSS

const UserProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, token, status, error } = useSelector((state) => state.auth);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      dispatch(fetchUserProfile());
    }
  }, [dispatch, token, navigate]);

  if (status === "loading") {
    return <div>Loading...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error.message}</div>;
  }

  if (!user) {
    return <div>No user data available</div>;
  }

  return (
    <div className="user_profil_font">
      <h2 className="size_user">
        {user.firstName} {user.lastName}!
      </h2>
    </div>
  );
};

export default UserProfile;
