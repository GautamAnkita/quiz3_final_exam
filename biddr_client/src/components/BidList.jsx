import React from "react";
import BidDetails from "./BidDetails";

const BidList = props =>{
    const {bids = [], onBidDeleteClick = () => {} } = props;

    return(
        <ul>
            {bids.map(bid =>(
                <li key = {bid.id}>
                <BidDetails onDeleteClick={onBidDeleteClick} {...bid} />
                </li>
            ))}

        </ul>
    );
};

export default BidList;