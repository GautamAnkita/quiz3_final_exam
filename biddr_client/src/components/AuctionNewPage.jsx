import React, { Component } from "react";
import Auction from "../requests/auction";
//import {CalendarStateless} from '@atlaskit/calendar'
//import FormErrors from "./FormErrors";

class AuctionNewPage extends Component {

  // static propTypes ={
  //   value: PropTypes.string,
  //   onChange: PropTypes.func.isRequired
  // }
  constructor(props) {
    super(props);

    
    this.state = {
      calendarOpened: false,
      selected: [],
      day: new Date().getDate(),
      month: new Date().getMonth() + 1,
      year: new Date().getFullYear()
    }

    //this.openCalendar = this.openCalendar.bind(this);
    //this.changeDate = this.changeDate.bind(this);
    this.createAuction = this.createAuction.bind(this);
  }

  selectDate (evt) {
    this.setState({ selected: evt.iso, calendarOpened: false })
  }
  // this is to display different months or years
  // without it we would only have one calendar page
  changeInfo ({ day, month, year }) {
    this.setState({ day, month, year })
  }

  openCalendar () {
    this.setState({calendarOpened: true})
  }

  createAuction(event) {
    event.preventDefault();
    const { currentTarget } = event;

    const formData = new FormData(currentTarget);

    Auction.create({
      title: formData.get("title"),
      details: formData.get("details"),
      endson: formData.get("startdate"),
      reserveprice: formData.get("reserveprice")
    }).then(data => {
      // debugger;

      if (data.status === 422) {
        this.setState({
          validationErrors: data.errors
        });
      } else {
        const auctionId = data.id;
        this.props.history.push(`/auctions/${auctionId}`);
      }
    });
  }

  render() {
    //const { validationErrors } = this.state;

    const { value } = this.props;

    return (
      <main>
        <h2>New Auction</h2>
        <form onSubmit={this.createAuction}>
          <div>
            <label htmlFor="title">Title</label> <br />
            {/* <FormErrors forField="title" errors={validationErrors} /> */}
            <input name="title" id="title" />
          </div>

          <div>
            <label htmlFor="details">Details</label> <br />
            {/* <FormErrors forField="body" errors={validationErrors} /> */}
            <textarea name="details" id="details" cols="60" rows="4" />
          </div>

          <div>
            <label htmlFor="startdate">Ends On </label> <br />
            <input type="text" name="startdate" value={this.startDate} placeholder='yyyy-mm-dd'/>
          </div>


   {/* <div>
           <input
           value={value || ''}
           placeholder='yyyy-mm-dd'
           onClick={() => this.openCalendar()} />
           {this.state.calendarOpened
             ? <CalendarStateless
               selected={this.props.value}
               day={this.state.day}
               month={this.state.month}
               year={this.state.year}
               onSelect={(evt) => this.selectDate(evt)}
               onChange={date => this.changeInfo(date)}/>
             : null}
   </div> */}

          
          {/* <div>
            <label htmlFor="endson">End On</label> <br /> */}
            {/* <FormErrors forField="title" errors={validationErrors} /> */}
            {/* <input name="endson" id="endson" />
          </div> */}

          <div>
            <label htmlFor="reserveprice">Reserve Price</label> <br />
            {/* <FormErrors forField="title" errors={validationErrors} /> */}
            <input name="reserveprice" id="reserveprice" />
          </div>

          <div>
            <input type="submit" value="Submit" />
          </div>


        </form>
      </main>
    );
  }
}

export default AuctionNewPage;