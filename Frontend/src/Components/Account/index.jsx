import React, { useState, useCallback } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionList from "./TransactionList";
import accountData from "../../Data/account.json";
import "./_account.scss";
import "../../assets/SASS/_mixins.scss";

const Account = ({ isEditing }) => {
  const [openAccountIndex, setOpenAccountIndex] = useState(null);

  const toggle = useCallback(
    (index) => {
      setOpenAccountIndex(openAccountIndex === index ? null : index);
    },
    [openAccountIndex]
  );

  return (
    <div className="accounts-container">
      <h2 className="sr-only">Accounts</h2>
      {accountData && accountData.length > 0 ? (
        <>
          {accountData.map((account, index) => (
            <React.Fragment key={index}>
              <section
                className={`account ${isEditing ? "account_editing" : ""}`}
              >
                <div className="account-content-wrapper">
                  <h3 className="account-title">{account.title}</h3>
                  <p className="account-amount">{account.amount}</p>
                  <h3 className="account-amount-description">
                    {account.description}
                  </h3>
                </div>
                <div className="account-content-wrapper cta">
                  {isEditing ? (
                    <FontAwesomeIcon
                      icon={
                        openAccountIndex === index ? faTimes : faChevronRight
                      }
                      className="arrow_right"
                      onClick={() => toggle(index)}
                      aria-label={
                        openAccountIndex === index
                          ? "Masquer les transactions"
                          : "Voir les transactions"
                      }
                    />
                  ) : (
                    <button
                      className="transaction-button"
                      onClick={() => toggle(index)}
                      aria-expanded={openAccountIndex === index}
                      aria-label={
                        openAccountIndex === index
                          ? "Masquer les transactions"
                          : "Voir les transactions"
                      }
                    >
                      {openAccountIndex === index
                        ? "Hide Transactions"
                        : "View Transactions"}
                      <FontAwesomeIcon
                        icon={
                          openAccountIndex === index ? faTimes : faChevronRight
                        }
                        className="arrow_right"
                      />
                    </button>
                  )}
                </div>
              </section>
              {openAccountIndex === index && account.transaction && (
                <section
                  className={`transactions-section ${
                    openAccountIndex === index ? "open" : ""
                  }`}
                >
                  <TransactionList
                    transactions={account.transaction}
                    isEditing={isEditing}
                  />
                </section>
              )}
            </React.Fragment>
          ))}
        </>
      ) : (
        <p>No accounts available</p>
      )}
    </div>
  );
};

export default Account;
