// React imports to allow access to React features.
import React from "react";
import { Link } from "react-router-dom";
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';
class RegisterComponent extends React.Component {

    // Constructor with some properties set inside the state whenever the state updates it will re-render the component. 
    constructor() {
        super();
        this.state = {
            email: null,
            password: null,
            passwordConfirmation: null,
            signupError: ''

        };
    }


    render() {

        return (


            <div className="container">

                {/*Register Account Text*/}
                <div class="Account_Text">Account Register</div>

                <div class="form">


                    {/*On sumbit calls the submitSignup function*/}

                    <form onSubmit={(e) => this.submitSignup(e)} >

                        {/*Keeps track of email when the user types*/}
                        <input required onChange={(e) => this.userTyping('email', e)} class="email" type="text" placeholder="e-mail" />


                        {/*Keeps track of  password when the user types*/}
                        <input required onChange={(e) => this.userTyping('password', e)} class="Password" type="password" placeholder="Password" />


                        {/*Keeps track of confirmation password when the user types*/}
                        <input required onChange={(e) => this.userTyping('passwordConfirmation', e)} class="Password" type="password" placeholder="ConfirmPassword" />

                        {/*Prints Error message if wrong information is entered*/}
                        {this.state.signupError ? <div class="ErrorMessage">{this.state.signupError}</div> : null}


                        {/*Register button */}
                        <button class="Login_Button" type="submit">Register</button>

                        {/* If user already has an account allows them to go to the login page*/}
                        <div class="Redirect"> <text>Already have an Account?</text> <Link to="/login">Login</Link> </div>

                    </form>

                </div>



                {/*Copyright Text*/}
                <footer class="Copyright">

                    <p> © Copyright: {new Date().getFullYear()}  AkioMessagingSystem Co. Ltd. All Rights Reserved </p>

                </footer>


            </div>


        );

    }
    // Updates the states when the user inputs data into the email feild, password feild and passwordConfirmation field.
  
    userTyping = (whichInput, event) => {
        switch (whichInput) {
          case 'email':
            this.setState({ email: event.target.value });
            break;
    
          case 'password':
            this.setState({ password: event.target.value });
            break;
    
          case 'passwordConfirmation':
            this.setState({ passwordConfirmation: event.target.value });
            break;
    
          default:
            break;
        }
      }

    //Checks to see if the password and  password Confirmation matches; 
    formIsValid = () => this.state.password === this.state.passwordConfirmation;

    // Check to see if the information passwords match if it does not match shows error
    submitSignup = (e) => {
        e.preventDefault(); // This is to prevent the automatic refreshing of the page on submit.
    
        if(!this.formIsValid()) {
          this.setState({ signupError: 'Passwords do not match' });
          return;
        }

        // Calls firebase and calls add the user to the authentication and then adds the user inside the database.
        // If it is correct we push/go to the chat if not an error is shown.
        // If it already exsists an error is shown .
        firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then(authRes => {
          const userObj = {
            email: authRes.user.email,
            friends: [],
            messages: []
          };
          firebase.firestore().collection('users').doc(this.state.email).set(userObj)
            .then(() => {
              this.props.history.push('/chat');
          }, dbErr => {
            console.log('Failed to add user to the database: ', dbErr);
            this.setState({ signupError: 'Failed to add user' });
          });
      }, authErr => {
        console.log('Failed to create user: ', authErr);
        this.setState({ signupError: 'Failed to add user' });
      });
    };

}

//Export Login Component.
export default RegisterComponent;