import React, { Component } from "react";
import Auction from "../requests/auction";

class BidNew extends Component {
    
    constructor(props) {
      super(props);

  
      this.createBid = this.createBid.bind(this);
    }

    
    createBid(event) {
        event.preventDefault();
        const { currentTarget } = event;
    
        const formData = new FormData(currentTarget);
    
        const bidBody = formData.get("bidbody");
        const { OnNewBid = () => {} } = this.props;
        OnNewBid(bidBody);
    }

    render() {
        
        return (
          <main>
            <br />
            <form onSubmit={this.createBid}>
             
              <div>
                <label htmlFor="bidbody">Bid Price</label> <br />
                <input type="textArea" name="bidbody" id="bidbody" />
              </div>
    
              <input type="submit" value="Submit" />
            </form>
          </main>
        );
    }
};

export default BidNew;