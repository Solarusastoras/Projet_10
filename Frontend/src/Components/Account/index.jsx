import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionList from "./TransactionList";
import accountData from "../../Data/account.json";
import "./_account.scss";
import "../../assets/SASS/_mixins.scss";

const Account = ({ isEditing }) => {
  return (
    <div className="accounts-container">
      <h2 className="sr-only">Accounts</h2>
      {accountData && accountData.length > 0 ? (
        <>
          {accountData.map((account, index) => (
            <AccountItem
              key={index}
              account={account}
              isEditing={isEditing}
            />
          ))}
        </>
      ) : (
        <p>No accounts available</p>
      )}
    </div>
  );
};

const AccountItem = ({ account, isEditing }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <React.Fragment>
      <section className={`account ${isEditing ? "account_editing" : ""}`}>
        <div className="account-content-wrapper">
          <h3 className="account-title">{account.title}</h3>
          <p className="account-amount">{account.amount}</p>
          <h3 className="account-amount-description">{account.description}</h3>
        </div>
        <div className="account-content-wrapper cta">
          {isEditing ? (
            <FontAwesomeIcon
              icon={isOpen ? faTimes : faChevronRight}
              className="arrow_right"
              onClick={toggle}
              aria-label={isOpen ? "Masquer les transactions" : "Voir les transactions"}
            />
          ) : (
            <button
              className="transaction-button"
              onClick={toggle}
              aria-expanded={isOpen}
              aria-label={isOpen ? "Masquer les transactions" : "Voir les transactions"}
            >
              {isOpen ? "Hide Transactions" : "View Transactions"}
              <FontAwesomeIcon
                icon={isOpen ? faTimes : faChevronRight}
                className="arrow_right"
              />
            </button>
          )}
        </div>
      </section>
      {isOpen && account.transaction && (
        <section className={`transactions-section ${isOpen ? "open" : ""}`}>
          <TransactionList transactions={account.transaction} isEditing={isEditing} />
        </section>
      )}
    </React.Fragment>
  );
};

export default Account;