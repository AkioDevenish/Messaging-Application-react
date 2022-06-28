// React imports to allow access to React features.
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


class NewChatComponent extends React.Component {

    // Constructor with some properties set inside the state whenever the state updates it will re-render the component. 
    constructor() {
        super();
        this.state = {
            username: null,
            message: null

        };
    }

    render() {

        return (

            <div>

                {/*Send a Message Text*/}
                <div class="Account_Text">Send a message</div>

                  <div class="form">

                    <form onSubmit={(e) => this.submitNewChat(e)}>


                        {/*Keeps track of username when the user types*/}
                        <input required onChange={(e) => this.userTyping('username', e)} class="email" type="text" placeholder="Enter Your Friend's Email" />

                        {/*Prints Error message if wrong information is entered*/}
                        <div class="ErrorMessage">  </div>


                        {/*Keeps track of message when the user types*/}
                        <input required onChange={(e) => this.userTyping('message', e)} class="Password" type="text" placeholder="Enter message" />

                        {/*Send button */}
                        <button class="Login_Button" type="submit">Send</button>

                    </form>

                </div>

            </div>

        );

    }

    
    // Updates the states when the user inputs data into the username feild, message feild and passwordConfirmation field.
    userTyping = (type, e) => {
        switch (type) {
            case 'username':
                this.setState({ username: e.target.value });
                break;

            case 'message':
                this.setState({ message: e.target.value });
                break;

            default:
                break;


        }

    }


    // If the user exists and chat exists if we have both it goes to chat else it creates a new chat 
    submitNewChat = async (e) => {
        e.preventDefault();
        const IfuserExists = await this.IfuserExists();
        if (IfuserExists) {

            const IfchatExists = await this.IfchatExists();

            IfchatExists ? this.ProceedToChat() : this.InitilizeChat();

        }

    }

// Takes a ojects username and message. 
    InitilizeChat = () => {
        this.props.newChatSubmitFn({
            sendTo: this.state.username,
            message: this.state.message
        });
    }

    // Goes to the chat takes a document key and message. 
    ProceedToChat = () => this.props.ProceedToChatFn(this.buildDocKey(), this.state.message);


    // This buildDocKey sorts the information in an array and key and join it to create a dockey.
    buildDocKey = () => {

        return [firebase.auth().currentUser.email, this.state.username].sort().join(':');
    }


    //See if a chat exists  we dont want to create a new chat if the chat already exists  in the datbase. 
    IfchatExists = async () => {

        const docKey = this.buildDocKey();
        const chat = await firebase.firestore().collection('chats').doc(docKey).get();
        console.log(chat.exists);
        return chat.exists;

    }

    //Checks to see if the user exists so we could create a chat with the user we dont want to create a chat without the user exisiting 
    IfuserExists = async () => {

        const userSnapshot = await firebase.firestore().collection('users').get();

        const exists = userSnapshot.docs.map(_doc => _doc.data().email).includes(this.state.username);

        return exists;

    }

}


//Export NewChatComponen component.
export default NewChatComponent;