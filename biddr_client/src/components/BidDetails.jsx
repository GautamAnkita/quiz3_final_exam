import React from "react";

const BidDetails = props => {
  const { onDeleteClick = () => {} } = props;
  return (
    <div>
      <p> ${props.bidprice}</p>
      <p>at: {new Date(props.created_at).toLocaleString()}</p>
      <p>
        <button onClick={() => onDeleteClick(props.id)}>Delete</button>
      </p>
    </div>
  );
};

export default BidDetails;