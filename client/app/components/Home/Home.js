import React, { Component } from "react";
import { getFromStorage, setInStorage } from "../../utils/storage";
import "whatwg-fetch";
import LogIn from "../login/login";

class Home extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // isLoading: true,
      // is signed in?
      // token: "",
      // signUpError: "",
      // signInError: "",
      // signInEmail: "",
      // signInPassword: "",
      // signUpFirstName: "",
      // signUpLastName: "",
      // signUpPassword: "",
      // signUpEmail: ""
    };

  //   this.onTextBoxChangeSignInEmail = this.onTextBoxChangeSignInEmail.bind(
  //     this
  //   );
  //   this.onTextBoxChangeSignInPassword = this.onTextBoxChangeSignInPassword.bind(
  //     this
  //   );
  //   this.onTextBoxChangeSignUpEmail = this.onTextBoxChangeSignUpEmail.bind(
  //     this
  //   );
  //   this.onTextBoxChangeSignUpFirstName = this.onTextBoxChangeSignUpFirstName.bind(
  //     this
  //   );
  //   this.onTextBoxChangeSignUpLastName = this.onTextBoxChangeSignUpLastName.bind(
  //     this
  //   );
  //   this.onTextBoxChangeSignUpPassword = this.onTextBoxChangeSignUpPassword.bind(
  //     this
  //   );
  //   this.onSignIn = this.onSignIn.bind(this);
  //   this.onSignUp = this.onSignUp.bind(this);
  //   this.onLogOut = this.onLogOut.bind(this);
  // }
  }
  // componentDidMount() {
  //   const obj = getFromStorage("the_main_app");
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // verify token
  //     fetch("/api/account/verify?token=" + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token,
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false
  //     });
  //   }
  // }
  
  // onSignIn(event) {
  //   // grab state
  //   // Post Request to backend
  //   const { signInEmail, signInPassword } = this.state;

  //   this.setState({
  //     isLoading: true
  //   });

  //   // Post Request to backend
  //   fetch("/api/account/signin", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       email: signInEmail,
  //       password: signInPassword
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.success) {
  //         setInStorage("the_main_app", { token: json.token });
  //         this.setState({
  //           signInError: json.message,
  //           isLoading: false,
  //           signInPassword: "",
  //           signInEmail: "",
  //           token: json.token
  //         });
  //       } else {
  //         this.setState({
  //           signInError: json.message,
  //           isLoading: false
  //         });
  //       }
  //     });
  // }
  // onSignUp(event) {
  //   // grab state
  //   const {
  //     signUpFirstName,
  //     signUpLastName,
  //     signUpEmail,
  //     signUpPassword
  //   } = this.state;

  //   this.setState({
  //     isLoading: true
  //   });

  //   // Post Request to backend
  //   fetch("/api/account/signup", {
  //     method: "POST",
  //     headers: {
  //       "Content-Type": "application/json"
  //     },
  //     body: JSON.stringify({
  //       firstName: signUpFirstName,
  //       lastName: signUpLastName,
  //       email: signUpEmail,
  //       password: signUpPassword
  //     })
  //   })
  //     .then(res => res.json())
  //     .then(json => {
  //       if (json.success) {
  //         this.setState({
  //           signUpError: json.message,
  //           isLoading: false,
  //           signUpPassword: "",
  //           signUpEmail: "",
  //           signUpFirstName: "",
  //           signUpLastName: ""
  //         });
  //       } else {
  //         this.setState({
  //           signUpError: json.message,
  //           isLoading: false
  //         });
  //       }
  //     });
  // }

  // onLogOut() {
  //   this.setState({
  //     isLoading: true,
  //   });
  //   const obj = getFromStorage("the_main_app");
  //   if (obj && obj.token) {
  //     const { token } = obj;
  //     // verify token
  //     fetch("/api/account/logout?token=" + token)
  //       .then(res => res.json())
  //       .then(json => {
  //         if (json.success) {
  //           this.setState({
  //             token: "",
  //             isLoading: false
  //           });
  //         } else {
  //           this.setState({
  //             isLoading: false
  //           });
  //         }
  //       });
  //   } else {
  //     this.setState({
  //       isLoading: false,
  //       token: ""
  //     });
  //   } window.location.reload(true);
  // }

  // onTextBoxChangeSignInEmail(event) {
  //   this.setState({
  //     signInEmail: event.target.value
  //   });
  // }
  // onTextBoxChangeSignInPassword(event) {
  //   this.setState({
  //     signInPassword: event.target.value
  //   });
  // }
  // onTextBoxChangeSignUpEmail(event) {
  //   this.setState({
  //     signUpEmail: event.target.value
  //   });
  // }
  // onTextBoxChangeSignUpPassword(event) {
  //   this.setState({
  //     signUpPassword: event.target.value
  //   });
  // }
  // onTextBoxChangeSignUpFirstName(event) {
  //   this.setState({
  //     signUpFirstName: event.target.value
  //   });
  // }
  // onTextBoxChangeSignUpLastName(event) {
  //   this.setState({
  //     signUpLastName: event.target.value
  //   });
  // }

  render() {
    return (  
     
    <LogIn />
    );
  //   const {
  //     isLoading,
  //     token,
  //     signInEmail,
  //     signInError,
  //     signInPassword,
  //     signUpFirstName,
  //     signUpLastName,
  //     signUpPassword,
  //     signUpEmail,
  //     signUpError
  //   } = this.state;

  //   if (isLoading) {
  //     return (
  //       <div>
  //         <p>Loading...</p>
  //       </div>
  //     );
  //   }

  //   if (!token) {
  //     return (
  //       <>
  //         <div>
  //           {signInError ? <p>{signInError}</p> : null}
  //           <p>Sign In</p>
  //           <label>Email:</label>
  //           <br />
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             value={signInEmail}
  //             onChange={this.onTextBoxChangeSignInEmail}
  //           />
  //           <br />
  //           <input
  //             type="password"
  //             placeholder="password"
  //             value={signInPassword}
  //             onChange={this.onTextBoxChangeSignInPassword}
  //           />
  //           <br />
  //           <button onClick={this.onSignIn}>Sign In</button>
  //         </div>
  //         <br />
  //         <br />
  //         <div>
  //           {signUpError ? <p>{signUpError}</p> : null}
  //           <p>Sign Up</p>
  //           <input
  //             type="text"
  //             placeholder="firstName"
  //             value={signUpFirstName}
  //             onChange={this.onTextBoxChangeSignUpFirstName}
  //           />
  //           <br />
  //           <input
  //             type="text"
  //             placeholder="lastName"
  //             value={signUpLastName}
  //             onChange={this.onTextBoxChangeSignUpLastName}
  //           />
  //           <br />
  //           <input
  //             type="email"
  //             placeholder="Email"
  //             value={signUpEmail}
  //             onChange={this.onTextBoxChangeSignUpEmail}
  //           />
  //           <br />
  //           <input
  //             type="password"
  //             placeholder="password"
  //             value={signUpPassword}
  //             onChange={this.onTextBoxChangeSignUpPassword}
  //           />{" "}
  //           <br />
  //           <button onClick={this.onSignUp}>Sign Up</button>
  //         </div>
  //       </>
  //     );
  //   }

  //   return (
  //     <>
  //       <div>
  //         <p>Account</p>
  //         <button onClick={this.onLogOut}>Log Out</button>
  //       </div>
  //     </>
  //   );

  }
}

export default Home;
