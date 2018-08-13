import React, { Component } from "react";
import AuctionDetails from "./AuctionDetails";
import BidList from "./BidList";
import Auction from "../requests/auction";
import BidNew from "./BidNew";

class AuctionShowPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
        loading: true,
        aution: undefined,
        current_user: undefined
      };
  
      this.deleteAuction = this.deleteAuction.bind(this);
      this.deleteBid = this.deleteBid.bind(this);
      this.newBid = this.newBid.bind(this);
    }
  
    componentDidMount() {

      const { onSignIn = () => {} } = this.props;
      const current_user = onSignIn();
     
      const auctionId = this.props.match.params.id;
      Auction.one(auctionId)
        .then(auction => {
          console.log(auction);
          this.setState({ loading: false, auction: auction, current_user: current_user });
        })
        .catch(() => {
          this.setState({ loading: false });
        });
    }
  
    deleteAuction() {
      this.setState({
        auction: undefined
      });
    }

    newBid(bidprice) {
      const { auction } = this.state;
      const { bids = [] } = auction;
      const auctionId = auction.id;
      Auction.createBid(auctionId, 
        {
          bidprice: bidprice
        }
      ).then(data => {
        const currTime = new Date().toLocaleString();
        const newBid = {
          id: data.id,
          bidprice: bidprice,
          author: auction.author,
          created_at: currTime
        };
        bids.unshift(newBid);
        this.setState({auction: auction, bids: bids });
      });
    }
  
    deleteBid(id) {
      
      const { auction } = this.state;
      const { bids = [] } = auction;
      const auctionId = auction.id;
      Auction.deleteBid(auctionId, id)
      .then(data => {
        this.setState({
          auction: {
            ...auction,
            bids: bids.filter(bid => bid.id !== id)
          }
        });
      });
      
    }
  
    render() {
      const { loading, auction, current_user } = this.state;
  
      if (loading) {
        return (
          <main>
            <h2>Loading...</h2>
          </main>
        );
      }
  
      if (!auction) {
        return (
          <main>
            <h2>Auction doesn't exist</h2>
          </main>
        );
      }

      // if(auction.current_user != current_user){
      //   console.log(auction.current_user);
      //   console.log(current_user);
  
        return (
          <main>
            <AuctionDetails {...auction} />
            <button onClick={this.deleteAuction}>Delete</button>
              <br />
              <hr />
            <BidNew OnNewBid={this.newBid}/>
            <br />
            <h2>Previous Bids</h2>
            <BidList
              onBidDeleteClick={this.deleteBid}
              bids={auction.bids}
            />
          </main>
        );
      //}

      // else{
      //   return (
      //     <main>
      //       <AuctionDetails {...auction} />
      //       <button onClick={this.deleteAuction}>Delete</button>
      //         <br />
      //         <hr />
      //       {/* <BidNew OnNewBid={this.newBid}/> */}
      //       <br />
      //       <h2>Previous Bids</h2>
      //       <BidList
      //         onBidDeleteClick={this.deleteBid}
      //         bids={auction.bids}
      //       />
      //     </main>
      //   );
      // }
    }
  }
  
  export default AuctionShowPage;