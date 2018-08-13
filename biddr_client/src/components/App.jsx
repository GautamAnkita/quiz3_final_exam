import React, { Component }  from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

import WelcomePage from "./WelcomePage";
import AuctionIndexPage from "./AuctionIndexPage";
import AuctionNewPage from "./AuctionNewPage";
import AuctionShowPage from "./AuctionShowPage";
import NavBar from "./NavBar";
import User from "../requests/user";
import SignInPage from "./SignInPage";
import SignUpPage from "./SignUpPage";
import Session from "../requests/session";
import AuthRoute from "./AuthRoute";

class App extends Component{
    constructor(props) {
        super(props);

        this.state = {
            loading: true,
            currentUser: undefined
        };

        this.destroySession = this.destroySession.bind(this);
        this.getUser = this.getUser.bind(this);
    }

    destroySession() {
        Session.destroy().then(() => {
          this.setState({ currentUser: undefined });
          
        });
        
    }

    getUser() {
        return User.current().then(data => {
          if (data.id) {
            this.setState({
              currentUser: data
            });
          }
        });
    }

    componentDidMount(){
        this.getUser().then(()=>{
          this.setState({loading: false});
        })
    }

    render(){
        const { currentUser, loading } = this.state;
        
        return(
            <Router>
            <div>
                <NavBar 
                onSignOut={this.destroySession}
                currentUser={currentUser} />
                <Switch>
                    <Route path="/" exact component={WelcomePage} />
                    <Route path="/auctions" exact component={AuctionIndexPage} />
                    <AuthRoute isAuth = {currentUser} path="/auctions/new" exact 
                        render={props => <AuctionNewPage {...props} />}
                    />
                    {/* <Route path="/auctions/:id" component={AuctionShowPage} /> */}
                    <Route path="/auctions/:id"
                        render={props => <AuctionShowPage {...props} currentUser={currentUser} />}
                    />
                    <Route path="/sign_in"
                        render={props => <SignInPage {...props} onSignIn={this.getUser} />}
                    />
                    <Route path="/sign_up"
                        render={props => <SignUpPage {...props} onSignUp={this.getUser} />}
                    />
                </Switch>
            </div>
        </Router>
        );
    }
};

export default App;