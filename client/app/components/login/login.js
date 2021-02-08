import React, { Component } from "react";
import LogOut from "./logout/logout";
import SignUp from "./signup/signup";
import "whatwg-fetch";
import { getFromStorage, setInStorage } from "../../utils/storage";
import SignIn from "./signin/signin";

class LogIn extends Component {
  constructor(props) {
    super(props);

    this.state = {
     isLoading: false,
     token: ""
    };
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
  // render Components in HTML
  render() {
    const {
      isLoading,
      token,
      signInEmail,
      signInPassword,
      
    } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    if (!token) {
      return (
        <>
          <SignIn />
          <SignUp />
        </>
      );
    }
  
    return  <LogOut /> 
  
  }
}

export default LogIn