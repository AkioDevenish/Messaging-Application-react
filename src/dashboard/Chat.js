// React imports to allow access to React features.
import React from 'react';
import ContactsComponent from '../ContactList/Contacts';
import ChatViewComponent from '../Chatview/chatView';
import ChatTextBoxComponent from '../chattextbox/chatTextBox';
import NewChatComponent from '../newchat/newChat';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

class ChatComponent extends React.Component {

  // Constructor with some properties set inside the state whenever the state updates it will re-render the component. 
  constructor() {
    super();
    this.state = {
      selectedChat: null,
      newChatFormVisible: false,
      email: null,
      friends: [],
      chats: []
    };
  }

  render() {


    return (
      <div>
        {/*Passes the props to the chat Contacts Component and passes the history to redirect*/}
        <ContactsComponent history={this.props.history}
          userEmail={this.state.email}
          selectChatFn={this.selectChat}
          chats={this.state.chats}
          selectedChatIndex={this.state.selectedChat}
          newChatBtnFn={this.newChatBtnClicked}>
        </ContactsComponent>
      {/*Passes the props to the chat ChatViewComponent*/}
        {
          this.state.newChatFormVisible ?
            null :
            <ChatViewComponent
              user={this.state.email}
              chat={this.state.chats[this.state.selectedChat]}
            >
            </ChatViewComponent>
        }
       {/*Passes the props to the chat ChatTextBoxCompoenet */}
        {
          this.state.selectedChat !== null && !this.state.newChatFormVisible ?
            <ChatTextBoxComponent
              submitMessageFn={this.submitMessage}
              messageReadFn={this.messageRead}
            ></ChatTextBoxComponent> :
            null
        }
       {/*Passes the props to the chat NewChatComponent */} 
        {

          this.state.newChatFormVisible ? <NewChatComponent
            ProceedToChatFn={this.ProceedToChat}
            newChatSubmitFn={this.newChatSubmit}
          ></NewChatComponent> : null

        }
      </div>
    );

  }


  // Select a chat and set the state.
  selectChat = async (chatIndex) => {

    await this.setState({ selectedChat: chatIndex, newChatFormVisible: false });
    this.messageRead();
  }

  // Takes an argument called friend and sorts it and returns the  doc key user1@gmail.com:user2@gmail.com 
  buildDocKey = (friend) => [this.state.email, friend].sort().join(':');

  // This function sends  the message to the database.
  submitMessage = (msg) => {

    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0]);

    firebase.firestore().collection('chats').doc(docKey).update({
      messages: firebase.firestore.FieldValue.arrayUnion({

        sender: this.state.email,
        message: msg,
        timestamp: Date.now()

      }),
      receiverHasRead: false
    });
  }


  // Sets states the newChatFormVisible: true, selectedChat: null. 
  newChatBtnClicked = () => this.setState({ newChatFormVisible: true, selectedChat: null });


  // Takes a dockey and a message finds the chat that we are looking then sets a state newChatFormVisible: false. 
  ProceedToChat = async (docKey, msg) => {

    const usersInChat = docKey.split(':');

    const chat = this.state.chats.find(_chat => usersInChat.every(_user => _chat.users.includes(_user)));

    this.setState({ newChatFormVisible: false });

    await this.selectChat(this.state.chats.indexOf(chat));

    this.submitMessage(msg);

  }

  //Takes a chat object and buildDocKey then goes to the chat collection and set the messages and users.
  newChatSubmit = async (chatObj) => {

    const docKey = this.buildDocKey(chatObj.sendTo);
    await
      firebase.firestore().collection('chats').doc(docKey)
        .set({
          messages: [{
            message: chatObj.message,
            sender: this.state.email
          }],
          users: [this.state.email, chatObj.sendTo],
          receiverHasRead: false
        })
    this.setState({ newChatFormVisible: false });
    this.selectChat(this.state.chats.length - 1);

  }

  //This function tells us weather or not a person has clicked the chat if they are the sender it remains as set false and if it is the sender remains true 
  clickedChatWhereNotSender = (chatIndex) => this.state.chats[chatIndex].messages[this.state.chats[chatIndex].messages.length - 1].sender !== this.state.email;


  
  // Checks to see if the user clickedChatWhereNotSender if they are not the sender update the recevierHasRead if they are dont do anything.
  messageRead = () => {

    const docKey = this.buildDocKey(this.state.chats[this.state.selectedChat].users.filter(_usr => _usr !== this.state.email)[0])
    if (this.clickedChatWhereNotSender(this.state.selectedChat)) {

      firebase.firestore().collection('chats').doc(docKey).update({ receiverHasRead: true })
    } else {
      console.log('Clicked read message');
    }
  }



// Gets called automatically by react when the component is put into the dom whatever is inside it will be called
// on AuthStateChanged what ever is inside will get called and pushes to login if not user
// else goes into the firestore database and gets chats from firebase if its associated with the user.
  componentDidMount = () => {
    firebase.auth().onAuthStateChanged(async _usr => {
      if (!_usr)
        this.props.history.push('/login');
      else {
        await firebase
          .firestore()
          .collection('chats')
          .where('users', 'array-contains', _usr.email)
          .onSnapshot(async res => {
            const chats = res.docs.map(_doc => _doc.data());
            await this.setState({
              email: _usr.email,
              chats: chats,

            });
            console.log(this.state);
          })
      }
    });
  }
}

//Export ChatComponent.
export default ChatComponent;