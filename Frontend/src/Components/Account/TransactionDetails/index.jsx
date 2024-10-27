import React from "react";
import "../TransactionList/_transactionList.scss";

const TransactionDetails = ({ transaction }) => {
  return (
    <div className="transaction-details">
      <p><strong>Transaction type:</strong> {transaction["Transaction type"]}</p>
      <p><strong>Category:</strong> {transaction.Category}</p>
      <p><strong>Note:</strong> {transaction.Note}</p>
    </div>
  );
};

export default TransactionDetails;