import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronDown, faChevronUp } from "@fortawesome/free-solid-svg-icons";
import TransactionDetails from "../TransactionDetails";
import "./_transactionList.scss";

const TransactionList = ({ transactions }) => {
  const [selectedTransaction, setSelectedTransaction] = useState(null);

  const toggleTransactionDetails = (transaction) => {
    setSelectedTransaction(transaction === selectedTransaction ? null : transaction);
  };

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id} className="transaction-item">
          <div
            className="transaction-summary"
            onClick={() => toggleTransactionDetails(transaction)}
          >
            <span className="transaction-date">{transaction.date}</span>
            <span className="transaction-description">
              {transaction.Description}
            </span>
            <span className="transaction-amount">{transaction.Amount}</span>
            <span className="transaction-balance">{transaction.Balance}</span>
            <FontAwesomeIcon
              icon={
                selectedTransaction === transaction
                  ? faChevronUp
                  : faChevronDown
              }
              className="fleche_up"
            />
          </div>
          {selectedTransaction === transaction && (
            <TransactionDetails transaction={transaction} />
          )}
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;