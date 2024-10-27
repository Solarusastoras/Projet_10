import React, { useState } from "react";
import "./_user.scss";
import NewUserProfile from "../../Components/UpdateUsername";
import Account from "../../Components/Account";
import UserProfile from "../../Components/UserProfile";
import Header from "../../Components/Header";

function User() {
  const [showUserProfile, setShowUserProfile] = useState(true);
  const [mainClass, setMainClass] = useState("main bg-dark");
  const [accountClass, setAccountClass] = useState("account");
  const [showTransactions, setShowTransactions] = useState(true);
  const [buttonClass, setButtonClass] = useState("transaction-button");
  const [iconClass, setIconClass] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  const handleEditNameClick = () => {
    setShowUserProfile(false);
    setMainClass("main bg-white"); // Change the background to white
    setAccountClass("account dark-bg"); // Change the account background to dark gray
    setShowTransactions(false); // Hide the "View transactions" button
    setButtonClass("transaction-button transparent-bg"); // Change button background to transparent
    setIconClass("large-icon"); // Change icon size to 7rem
    setIsEditing(true); // Set editing state to true
  };

  const handleCancelClick = () => {
    setShowUserProfile(true);
    setMainClass("main bg-dark"); // Revert the background to dark
    setAccountClass("account"); // Revert the account background
    setShowTransactions(true); // Show the "View transactions" button
    setButtonClass("transaction-button"); // Revert button background
    setIconClass(""); // Revert icon size
    setIsEditing(false); // Set editing state to false
  };

  return (
    <div>
      <Header isEditing={isEditing} />
      <main className={mainClass}>
        <div className="header">
          {showUserProfile && (
            <>
              <h1>Welcome back</h1>
              <UserProfile />
            </>
          )}
          <NewUserProfile
            onEditNameClick={handleEditNameClick}
            onCancelClick={handleCancelClick}
          />
        </div>
        <Account />
      </main>
    </div>
  );
}

export default User;
