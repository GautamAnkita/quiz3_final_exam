import React from "react";
import { NavLink } from "react-router-dom";

const NavBar = props =>{
    const {currentUser, onSignOut = () => {} } = props;

    const handleClick = event => {
        event.preventDefault();
        onSignOut();
      };

return(
    <nav className="NavBar">
        <NavLink exact to="/">
            Welcome
        </NavLink>

        {currentUser && (
        <NavLink exact to="/auctions/new">
          New Auction
        </NavLink>
        )}

        

        <NavLink exact to="/auctions">
            Auctions
        </NavLink>

        

        {currentUser ? (
            <React.Fragment>
            <span>{currentUser.full_name}</span>
            <a onClick={handleClick} href="#not-used">
                Sign Out
            </a>
            </React.Fragment>
        ) : (
            <React.Fragment>
                <NavLink className="supports-classname" exact to="/sign_in">
                Sign In
                </NavLink>
                
                <NavLink className="supports-classname" exact to="/sign_up">
                Sign Up
                </NavLink>
            </React.Fragment>
        )}
    </nav>


    );
};

export default NavBar;