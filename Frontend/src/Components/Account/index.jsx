import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionList from "./TransactionList";
import accountData from "../../Data/account.json";
import "./_account.scss";

const Account = ({ isEditing }) => {
  const [openAccountIndex, setOpenAccountIndex] = useState(null);

  const toggle = (index) => {
    setOpenAccountIndex(openAccountIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="sr-only">Accounts</h2>
      {accountData && accountData.length > 0 ? (
        accountData.map((account, index) => (
          <section key={index} className={`account ${isEditing ? "account_editing" : ""}`}>
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              {isEditing ? (
                <FontAwesomeIcon
                  icon={openAccountIndex === index ? faTimes : faChevronRight}
                  className="arrow_right"
                  onClick={() => toggle(index)} // Ajout du gestionnaire d'événements onClick
                />
              ) : (
                <button className="transaction-button" onClick={() => toggle(index)}>
                  {openAccountIndex === index ? "Hide Transactions" : "View Transactions"}
                  <FontAwesomeIcon
                    icon={openAccountIndex === index ? faTimes : faChevronRight}
                    className="arrow_right"
                  />
                </button>
              )}
            </div>
            {openAccountIndex === index && account.transaction && (
              <div className="account-details">
                <TransactionList transactions={account.transaction} />
              </div>
            )}
          </section>
        ))
      ) : (
        <p>No accounts available</p>
      )}
    </div>
  );
};

export default Account;