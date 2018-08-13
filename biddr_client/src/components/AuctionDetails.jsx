import React from "react";

const AuctionDetails = props => {
    return (
      <div> 
        <h2>{props.title}</h2>
        <p>{props.details}</p>
    
        <p>Reserved price: {props.reserveprice}</p>
        <p>By {props.author.full_name}</p>
        {/* <p>{props.created_at.toLocaleString()}</p>
        <p>{props.updated_at.toLocaleString()}</p> */}
      </div>
    );
};

export default AuctionDetails;