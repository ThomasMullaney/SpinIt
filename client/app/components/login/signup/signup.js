import React, { Component } from "react";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../../utils/storage";

class SignUp extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      signUpEmail: "",
      signUpFirstName: "",
      signUpLastName: "",
      signUpPassword: "",
      signUpError: "",
    };

    // binding
    this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(
      this
    );
    this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(
      this
    );
    this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(
      this
    );
    this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(
      this
    );
    this.onSignUp = this.onSignUp.bind(this);
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
  //signUp function
  onSignUp(event) {
    // grab state
    const {
      signUpFirstName,
      signUpLastName,
      signUpEmail,
      signUpPassword,
    } = this.state;

    this.setState({
      isLoading: true,
    });

    // Post Request to backend
    fetch("/api/account/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstName: signUpFirstName,
        lastName: signUpLastName,
        email: signUpEmail,
        password: signUpPassword,
      }),
    })
      .then((res) => res.json())
      .then((json) => {
        if (json.success) {
          this.setState({
            signUpError: json.message,
            isLoading: false,
            signUpPassword: "",
            signUpEmail: "",
            signUpFirstName: "",
            signUpLastName: "",
          });
        } else {
          this.setState({
            signUpError: json.message,
            isLoading: false,
          });
        }
      });
  }
  // textbox change functions
  onTextBoxChangeSignUpEmail(event) {
    this.setState({
      signUpEmail: event.target.value,
    });
  }
  onTextBoxChangeSignUpPassword(event) {
    this.setState({
      signUpPassword: event.target.value,
    });
  }
  onTextBoxChangeSignUpFirstName(event) {
    this.setState({
      signUpFirstName: event.target.value,
    });
  }
  onTextBoxChangeSignUpLastName(event) {
    this.setState({
      signUpLastName: event.target.value,
    });
  }

  render() {
    const {
      isLoading,
      token,
      signUpFirstName,
      signUpLastName,
      signUpPassword,
      signUpEmail,
      signUpError,
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
          <br />
          <br />
          <div>
            {signUpError ? <p>{signUpError}</p> : null}
            <p>Sign Up</p>
            <input
              type="text"
              placeholder="firstName"
              value={signUpFirstName}
              onChange={this.onTextBoxChangeSignUpFirstName}
            />
            <br />
            <input
              type="text"
              placeholder="lastName"
              value={signUpLastName}
              onChange={this.onTextBoxChangeSignUpLastName}
            />
            <br />
            <input
              type="email"
              placeholder="Email"
              value={signUpEmail}
              onChange={this.onTextBoxChangeSignUpEmail}
            />
            <br />
            <input
              type="password"
              placeholder="password"
              value={signUpPassword}
              onChange={this.onTextBoxChangeSignUpPassword}
            />{" "}
            <br />
            <button onClick={this.onSignUp}>Sign Up</button>
          </div>
        </>
      );
    }
  }
// }

export default SignUp;
