import React, { useState } from "react";
import "./_account.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight, faTimes } from "@fortawesome/free-solid-svg-icons";

function Account({ accountClass, showTransactions, buttonClass, iconClass }) {
  const [expandedSections, setExpandedSections] = useState({});

  const toggleExpand = (index) => {
    setExpandedSections((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const accounts = [
    {
      title: "Argent Bank Checking (x8349)",
      amount: "Valeur API $2,082.79",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Savings (x6712)",
      amount: "Valeur API $10,928.42",
      description: "Available Balance",
    },
    {
      title: "Argent Bank Credit Card (x8349)",
      amount: "Valeur API $184.30",
      description: "Current Balance",
    },
  ];

  return (
    <div>
      <h2 className="sr-only">Accounts</h2>
      {accounts.map((account, index) => (
        <section key={index} className={accountClass}>
          <div className="account-content-wrapper">
            <h3 className="account-title">{account.title}</h3>
            <p className="account-amount">{account.amount}</p>
            <p className="account-amount-description">{account.description}</p>
          </div>
          <div className="account-content-wrapper cta">
            {showTransactions ? (
              <button className={buttonClass} onClick={() => toggleExpand(index)}>
                View transactions
              </button>
            ) : (
              <button className={buttonClass} onClick={() => toggleExpand(index)}>
                {expandedSections[index] ? (
                  <FontAwesomeIcon icon={faTimes} className={iconClass} />
                ) : (
                  <FontAwesomeIcon icon={faChevronRight} className={iconClass} />
                )}
              </button>
            )}
          </div>
          {expandedSections[index] && (
            <div className="account-details">
              {/* Account details go here */}
            </div>
          )}
        </section>
      ))}
    </div>
  );
}

export default Account;