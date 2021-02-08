import React, { Component } from "react";
import LogOut from "../logout/logout";
import SignUp from "../signup/signup";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../../utils/storage";
class SignIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signInEmail: "",
      signInPassword: "",
      signInError: "",
      token: ""
    };

    this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(
      this
    );
    this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(
      this
    );
    this.onSignIn = this.onSignIn.bind(this);
  }
  
  componentDidMount() {
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch("/api/account/verify?token=" + token)
        .then(res => res.json())
        .then(json => {
          if (json.success) {
            this.setState({
              token,
              isLoading: false
            });
          } else {
            this.setState({
              isLoading: false
            });
          }
        });
    } else {
      this.setState({
        isLoading: false
      });
    }
  }
  onSignIn(event) {
    // grab state
    // Post Request to backend
    const { signInEmail, signInPassword } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post Request to backend
    fetch("/api/account/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: signInEmail,
        password: signInPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          setInStorage("the_main_app", { token: json.token });
          this.setState({
            signInError: json.message,
            isLoading: false,
            signInPassword: "",
            signInEmail: "",
            token: json.token,
          }).then(window.reload(true));
        } else {
          this.setState({
            signInError: json.message,
            isLoading: false,
          });
        }
      });
  }

  onTextBoxChangeSignInEmail(event) {
    this.setState({
      signInEmail: event.target.value
    });
  }
  onTextBoxChangeSignInPassword(event) {
    this.setState({
      signInPassword: event.target.value
    });
  }

  // render Components in HTML
  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInError,
      signInPassword,
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    // if (!token) {
      return (
        <>
          <div>
            {signInError ? <p>{signInError}</p> : null}
            <p>Sign In</p>
            <label>Email:</label>
            <br />
            <input
              type="email"
              placeholder="Email"
              value={signInEmail}
              onChange={this.onTextBoxChangeSignInEmail}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={signInPassword}
              onChange={this.onTextBoxChangeSignInPassword}
            />
            <br />
            <button onClick={this.onSignIn}>Sign In</button>
          </div>
        </>
      );
    }
  }
// }

export default SignIn