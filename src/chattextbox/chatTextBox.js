// React imports to allow access to React features.
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


class ChatTextBoxComponent extends React.Component {

     // Constructor with some properties set inside the state whenever the state updates it will re-render the component. 
    constructor() {
        super();
        this.state = {
            chatText: ' '
        };
    }

    render() {

        return (
            <div>
                 {/*Keeps track of messages text when the user types*/}
                <input onKeyUp={(e) => this.userTyping(e)} onFocus={this.userClickedInput} id='chattextbox' class="TextBox" placeholder="Type Message Here..." name="msg" ></input>
                 {/*onClick calls the submitMessage function*/}
                <button onClick={this.submitMessage} type='submit' class="Send_Button_Chat">Send</button>

            </div>
        )
    }

    // check the key that the user enters in  if they press submit submit message and set the state.
    userTyping = (e) => e.keyCode === 13 ? this.submitMessage() : this.setState({ chatText: e.target.value })

    // This  checks to see if the user is sending spaces if they are it doesnt send. 
    messageVaild = (txt) => txt && txt.replace(/\s/g, '').length;

    // Submit Message function checks to see if the message is vaild and call the props submit message and clears the input box so the user doesnt have to
    submitMessage = () => {
        if (this.messageVaild(this.state.chatText)) {
            this.props.submitMessageFn(this.state.chatText);
            document.getElementById('chattextbox').value = '';
        }
    }

    // calls the parent function. 
    userClickedInput = () => this.props.messageReadFn();

}

//Export  ChatTextBoxComponent.
export default ChatTextBoxComponent;