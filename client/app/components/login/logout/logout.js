import React, { Component } from "react";

import { getFromStorage, setInStorage } from "../../../utils/storage";

class LogOut extends Component {
  constructor(props) {
    super(props);

    this.state = {
      isLoading: true,
      // is signed in?
      token: "",
    };
    //bind
    this.onLogOut = this.onLogOut.bind(this);
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
  // logout function
  onLogOut() {
    this.setState({
      isLoading: true,
    });
    const obj = getFromStorage("the_main_app");
    if (obj && obj.token) {
      const { token } = obj;
      // verify token
      fetch("/api/account/logout?token=" + token)
        .then((res) => res.json())
        .then((json) => {
          if (json.success) {
            this.setState({
              token: "",
              isLoading: false,
            });
          } else {
            this.setState({
              isLoading: false,
            });
          }
        });
    } else {
      this.setState({
        isLoading: false,
        token: "",
      });
    }
    window.location.reload(true);
  }

  render() {
    const { isLoading } = this.state;

    if (isLoading) {
      return (
        <div>
          <p>Loading...</p>
        </div>
      );
    }

    return (
      <>
        <div>
          <p>Account</p>
          <button onClick={this.onLogOut}>Log Out</button>
        </div>
      </>
    );
  }
}
export default LogOut;
