import React, { useState } from "react"; // Ajout du useState
import "./_transactionList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "./TransactionDetails";

const TransactionList = ({ transactions, isEditing }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toggleDetails = (transactionId) => {
    setSelectedTransaction(
      selectedTransaction === transactionId ? null : transactionId
    );
  };

  if (!transactions || transactions.length === 0) {
    return <p>No transactions available</p>;
  }

  return (
    <div className={`transaction-container ${isEditing ? "editing" : ""}`}>
      <div className={`transaction-header ${isEditing ? "editing" : ""}`}>
        <p className="marge_r_date">Date</p>
        <p className="marge_r_description">Description</p>
        <p className="marge_r_amount">Amount</p>
        <p className="marge_r_balance">Balance</p>
      </div>
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.id} className="transaction-item">
            <div className="transaction-summary">
              <p className="transaction-date">{transaction.date}</p>
              <p className="transaction-description">
                {transaction.Description}
              </p>
              <p className="transaction-amount">{transaction.Amount}</p>
              <p className="transaction-balance">{transaction.Balance}</p>
              <div
                onClick={() => toggleDetails(transaction.id)}
                aria-expanded={selectedTransaction === transaction.id}
              >
                <FontAwesomeIcon
                  icon={faChevronDown}
                  className={`chevron-icon ${
                    selectedTransaction === transaction.id ? "rotated" : ""
                  }`}
                />
              </div>
            </div>
            {selectedTransaction === transaction.id && (
              <TransactionDetails transaction={transaction} />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TransactionList;
