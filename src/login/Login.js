// React imports to allow access to React features.
import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


class LoginComponent extends React.Component {


  // Constructor with some properties set inside the state whenever the state updates it will re-render the component. 
  constructor() {
    super();
    this.state = {
      email: null,
      password: null,
      serverError: false
    };
  }

  render() {

    return (


      <div className="container">

        {/*Login Account Text*/}
        <div class="Account_Text">Account Log In</div>

        <div class="form">


          {/*On sumbit calls the submitLogin function*/}
          <form onSubmit={(e) => this.submitLogin(e)} >

            {/*Keeps track of username when the user types*/}
            <input required onChange={(e) => this.userTyping('email', e)} class="email" type="text" placeholder="email" />

            {/*Keeps track of username when the user types*/}
            <input required onChange={(e) => this.userTyping('password', e)} class="Password" type="password" placeholder="Password" />

            {/*Prints Error message if wrong information is entered*/}
            {this.state.serverError ? <div class="ErrorMessage">Please Enter the Correct Information</div> : null}


            {/*Login button */}
            <button class="Login_Button" type="submit">Login</button>

            {/* If user doesnt have and account this link allows them to go to the register page*/}
            <div class="Redirect"> <text>Don't have an account?</text> <Link to="/register">Register</Link> </div>

          </form>



        </div>

        {/*Copyright Text*/}
        <footer class="Copyright">

          <p> © Copyright: {new Date().getFullYear()}  AkioMessagingSystem Co. Ltd. All Rights Reserved </p>

        </footer>


      </div>


    );

  }


  // Updates the states when the user inputs data into the email feild or password feild.
  userTyping = (whichInput, event) => {
    switch (whichInput) {
      case 'email':
        this.setState({ email: event.target.value });
        break;

      case 'password':
        this.setState({ password: event.target.value });
        break;

      default:
        break;
    }
  }

  // Calls firebase and calls signInWithEmailAndPassword and inside it we set the states email and password 
  // If it is correct we push/go to the chat if not an error is shown Please Enter the Correct Information.
  submitLogin = async (e) => {
    e.preventDefault(); // Prevents the automatic refreshing of the page on submit.

    await firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then(() => {
      this.props.history.push('/chat');
    }, err => {
      this.setState({ serverError: true });
      console.log('Error logging in: ', err);
    });
  };

}

//Export Login Component.
export default LoginComponent;
