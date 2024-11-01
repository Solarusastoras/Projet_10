import React from "react";
import "./_transactionDetails.scss";
import "../../../../assets/SASS/_mixins.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPencil } from "@fortawesome/free-solid-svg-icons";

const TransactionDetails = ({ transaction, isEditing, className }) => {
  return (
    <div
      className={`transaction-details ${className} ${
        isEditing ? "editing" : ""
      }`}
    >
      <div className="transaction_detail_row">
        <p>Type:</p>
        <p className="marge_r_type">{transaction.Type}</p>
      </div>
      <div className="transaction_detail_row">
        <p>Category:</p>
        <p className="marge_r_category">
          {transaction.Category}
          <FontAwesomeIcon icon={faPencil} className="edit-icon_pencil" />
        </p>
      </div>
      <div className="transaction_detail_row">
        <p>Note:</p>
        <p className="marge_r_note">
          {transaction.Note}
          <FontAwesomeIcon icon={faPencil} className="edit-icon_pencil" />
        </p>
      </div>
    </div>
  );
};

export default TransactionDetails;
