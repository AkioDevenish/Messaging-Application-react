// React imports to allow access to React features and React Components.
import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route} from "react-router-dom";// Imports routing components for to be used. 
import  LoginComponent from './login/Login';
import  ChatComponent from './dashboard/Chat';
import  RegisterComponent from './register/Register';
import  WelcomeComponent from './Welcome/Welcome';
import  firebase  from 'firebase/app';
import 'firebase/auth';

//Firebase Database Access
firebase.initializeApp({
    apiKey: "AIzaSyD22PgxYF2mNQFUuEfWOoJSnH1-q30rUpQ",
    authDomain: "chat-application-3399b.firebaseapp.com",
    projectId: "chat-application-3399b",
    storageBucket: "chat-application-3399b.appspot.com",
    messagingSenderId: "870505037908",
    appId: "1:870505037908:web:094769b12e2cb5b72a6dc1"
});


// Allows the user to route to route to other components
const  routing = ( 
    
        <Router> 
                <div>
                    {/* Allows to go to login page */}
                    <Route path='/login' component={LoginComponent}></Route>
                     {/* Allows to go to register page */}
                    <Route path='/register' component={RegisterComponent}></Route>
                      {/* Allows to go to chat page */}
                    <Route path='/chat' component={ChatComponent}></Route>
                      {/* Allows to go to Welcome  page */}
                    <Route exact path='/' component={WelcomeComponent}></Route>
                </div>
        </Router>
  


);


//Renders Const Routing 
ReactDOM.render(routing, document.getElementById("root"));
