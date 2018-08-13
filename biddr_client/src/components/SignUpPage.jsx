import React, { Component } from "react";
import Session from "../requests/session";
import User from "../requests/user";

class SignUpPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
        errorMessage: undefined
        };

        this.createUserWithSession = this.createUserWithSession.bind(this);
    }

    createUserWithSession(event) {
        event.preventDefault();
        const { currentTarget } = event;
        const formData = new FormData(currentTarget);
        console.log("Password:"+formData.get("password"));
        User.createUser({
            first_name: formData.get("first_name"),
            last_name: formData.get("last_name"),
            email: formData.get("email"),
            password: formData.get("password")
        }).then(data => {
            console.log(data);
            if (data.status === 404) {
                this.setState({
                errorMessage: "Invalid username or password"
                });
            } else {
                const { onSignUp = () => {} } = this.props;
                onSignUp();
                this.props.history.push("/");
            }
        });
    }

  render() {
    const { errorMessage } = this.state;
    return (
      <main>
        <h2>Sign Up</h2>
        <form onSubmit={this.createUserWithSession}>
          {errorMessage ? <p>{errorMessage}</p> : null}
          <div>
            <label htmlFor="first_name">First Name</label> <br />
            <input type="text" name="first_name" id="first_name" />
          </div>
          <div>
            <label htmlFor="last_name">Last Name</label> <br />
            <input type="text" name="last_name" id="last_name" />
          </div>
          <div>
            <label htmlFor="email">Email</label> <br />
            <input type="text" name="email" id="email" />
          </div>

          <div>
            <label htmlFor="password">Password</label> <br />
            <input type="password" name="password" id="password" />
          </div>

          <input type="submit" value="Sign Up" />
        </form>
      </main>
    );
  }
}

export default SignUpPage;