import React from "react";
import "./_transactionDetails.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const TransactionDetails = ({ transaction }) => {
  return (
    <div className="transaction-details">
      <div className="transaction_detail_row">
        <p>Transaction type:</p>
        <p className="marge_r_type">{transaction["Transaction type"]}</p>
      </div>

      <div className="transaction_detail_row">
        <p>Category:</p>
        <p className="marge_r_category">
          {" "}
          {transaction.Category}{" "}
          <FontAwesomeIcon icon={faPencil} className="edit-icon_pencil" />
        </p>
      </div>

      <div className="transaction_detail_row">
        <p>Note:</p>
        <p className="marge_r_note">
          {transaction.Note}{" "}
          <FontAwesomeIcon icon={faPencil} className="edit-icon_pencil" />
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
