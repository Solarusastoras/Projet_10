import React from "react";
import "./_transactionList.scss";

const TransactionList = ({ transactions }) => {
  if (!transactions || transactions.length === 0) {
    return <p>No transactions available</p>;
  }

  return (
    <ul>
      {transactions.map((transaction) => (
        <li key={transaction.id} className="transaction-item">
          <div className="transaction-summary">
            <span className="transaction-date">{transaction.date}</span>
            <span className="transaction-description">{transaction.Description}</span>
            <span className="transaction-amount">{transaction.Amount}</span>
            <span className="transaction-balance">{transaction.Balance}</span>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default TransactionList;