// React imports to allow access to React features.
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';


class ContactsComponent extends React.Component {


    render() {

        return (

            <div className="container">
    
                {/* Loads the contacts and new message button and contact text and logout button to the left of the screen*/}
                <div class="sidenav">

                    <div class="Contacts">

                        <h4>Contacts</h4>

                    </div>

                    <button class="NewMessage" onClick={this.newChat}> <div class="NewMessage_Text"> New Message </div></button>

                    <ul>
                        {
                            this.props.chats.map((_chat, _index) => {

                                return (
                                    <div key={_index}>
                                        {/* Calls the select chat funtion an passes the current index as well*/}
                                        <ul onClick={() => this.selectChat(_index)}
                                            selected={this.props.selectChatIndex === _index}>
                                            <div class="Contact" >
                                                <div class="Contact_1">
                                                    <div class="Username">
                                                          {/*  All users have the same avatar in this app */}
                                                        <img class="avatar" src="https://i.pinimg.com/750x/a4/2a/44/a42a4479c62c774b997cb4eff9ebb319.jpg " alt="Logo" />
                                                        <div class="Username_Text">
                                                            <h3>
                                                                {/* loads the user email */}
                                                                {_chat.users.filter(_user => _user !== this.props.userEmail)[0]}
                                                            </h3>

                                                            <h4>{<React.Fragment>
                                                                  {/* lods the current chat message that was last seen by the user */}
                                                                {_chat.messages[_chat.messages.length - 1].message.substring(0, 30)}

                                                            </React.Fragment>
                                                            }
                                                            </h4>
                                                        </div>
                                                    </div>

                                                </div>
                                                {/* If the reciver of the massage didnt read the message shows unread message if it is not sent by the user it doesnt show read message  */}
                                                {

                                                    _chat.receiverHasRead === false && !this.userIsSender(_chat) ?
                                                        <div>
                                                            unread message
                                                            </div> :
                                                        null

                                                }
                                            </div>
                                        </ul>

                                    </div>

                                )
                            })
                        }

                    </ul>
                    {/* Button for logout onClick calls the signout and signout the user */}
                    <button class="Logout" onClick={this.signOut}><div class="Logout_Text">Logout </div></button>

                </div>

            </div>

        );

    }

    // When this is called signs the user out. 
    signOut = () => firebase.auth().signOut();

      //Calls the parent function.
    newChat = () => {
        this.props.newChatBtnFn();
    }

    //Calls the parent function with the index.
    selectChat = (index) => {
        this.props.selectChatFn(index);

    }

    // Checks to see if the person that is current logged in is the sender. 
    userIsSender = (chat) => chat.messages[chat.messages.length - 1].sender === this.props.userEmail;


}

//Export  ContactsComponent.
export default ContactsComponent;