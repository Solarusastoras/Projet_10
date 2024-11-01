import React, { useState } from "react";
import "./_transactionList.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faTimes } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "./TransactionDetails";
import "../../../assets/SASS/_mixins.scss";

const TransactionList = ({ transactions, isEditing }) => {
  return (
    <div className={`transaction-container ${isEditing ? "editing" : ""}`}>
      <div className="transaction-header">
        <p className="marge_r_date">Date</p>
        <p className="marge_r_description">Description</p>
        <p className="marge_r_amount">Amount</p>
        <p className="marge_r_balance">Balance</p>
      </div>
      <ul>
        {transactions.map((transaction) => (
          <TransactionItem
            key={transaction.id}
            transaction={transaction}
            isEditing={isEditing}
          />
        ))}
      </ul>
    </div>
  );
};

const TransactionItem = ({ transaction, isEditing }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDetails = () => {
    setIsOpen(!isOpen);
  };

  return (
    <li className="transaction-item">
      <div className={`transaction-summary ${isEditing ? "editing" : ""}`}>
        <p className="transaction-date">{transaction.date}</p>
        <p className="transaction-description">{transaction.Description}</p>
        <p className="transaction-amount">{transaction.Amount}</p>
        <p className="transaction-balance">{transaction.Balance}</p>
        <div onClick={toggleDetails} aria-expanded={isOpen}>
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faChevronDown}
            className={`chevron-icon ${isOpen ? "rotated" : ""}`}
          />
        </div>
      </div>
      {isOpen && (
        <TransactionDetails
          transaction={transaction}
          isEditing={isEditing}
          className="slide-bottom"
        />
      )}
    </li>
  );
};

export default TransactionList;
