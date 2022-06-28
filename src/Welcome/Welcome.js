// React imports to allow access to React features.
import React from "react";
import {Link} from "react-router-dom";  


// Welcome Funtion 
class WelcomeComponent extends React.Component {


    render(){


    return(
        
        <div className= "container">
    
        {/* Welcome text*/}
        <div class="Welcome_Text">Welcome</div>

        <div class = "form">

        {/*Name of the applcation*/}
        <h2 class= "Welcome_H2">

        Akio Messaging  System
  
        </h2>


            {/* Allows the user to go to the register page another page on click*/}
            <Link class ="Welcome_Register_Link" to="/register"><button class ="Welcome_Register_Link_Button">Register </button></Link>
            
            {/* Allows the user to go to the login page another page on click*/}
            <Link  class ="Welcome_Login_Link" to="/login"><button class ="Welcome_Login_Link_Button">Login</button></Link>


        </div>
    
        </div>
     

    );
}




}

//Export Welcome component. 
export default WelcomeComponent;

