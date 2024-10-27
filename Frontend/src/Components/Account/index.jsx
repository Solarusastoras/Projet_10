import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import TransactionList from "./TransactionList";
import accountData from "../../Data/account.json";
import "./_account.scss";

const Account = () => {
  const [openAccountIndex, setOpenAccountIndex] = useState(null);

  const toggle = (index) => {
    setOpenAccountIndex(openAccountIndex === index ? null : index);
  };

  return (
    <div>
      <h2 className="sr-only">Accounts</h2>
      {accountData && accountData.length > 0 ? (
        accountData.map((account, index) => (
          <section key={index} className="account">
            <div className="account-content-wrapper">
              <h3 className="account-title">{account.title}</h3>
              <p className="account-amount">{account.amount}</p>
              <p className="account-amount-description">{account.description}</p>
            </div>
            <div className="account-content-wrapper cta">
              <button className="transaction-button" onClick={() => toggle(index)}>
                {openAccountIndex === index ? "Hide Transactions" : "View Transactions"}
                <FontAwesomeIcon
                  icon={openAccountIndex === index ? faChevronUp : faChevronDown}
                  className="fleche_up"
                />
              </button>
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