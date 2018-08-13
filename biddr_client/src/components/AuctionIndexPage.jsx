import React, { Component } from "react";
import Auction from "../requests/auction";
import { Link } from "react-router-dom";


class AuctionIndexPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: true,
      auctions: []
    };

    this.deleteAuction = this.deleteAuction.bind(this);
  }

  componentDidMount() {
    Auction.all()
      .then(auctions => {
        this.setState({ loading: false, auctions: auctions });
      })
      .catch(() => {
        this.setState({ loading: false });
      });
  }

  deleteAuction(event) {
    const { currentTarget } = event;
    const auctionId = parseInt(currentTarget.dataset.id, 10);
    const { auctions } = this.state;

    this.setState({
      auctions: auctions.filter(auction => auction.id !== auctionId)
    });

  }

  render() {
    
    const { loading, auctions } = this.state;

    if (loading) {
      return (
        <main>
          <h1>Auctions</h1>
          <h2>Loading...</h2>
        </main>
      );
    }

    return (
      <main>
        <h1>Auctions</h1>
        <ul style={{ padding: 0, listStyle: "none" }}>
          {auctions.map((auction, index) => (
            <li style={{ marginBottom: "1rem" }} key={auction.id}>
              <span>{new Date(auction.created_at).toLocaleDateString()}</span>
              {" • "}
              <Link to={`/auctions/${auction.id}`}>{auction.title}</Link>
              <br />
            
              <button data-id={auction.id} onClick={this.deleteAuction}>
                Delete
              </button>
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default AuctionIndexPage;