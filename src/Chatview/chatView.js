// React imports to allow access to React features.
import React from 'react';
import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';



class ChatViewComponent extends React.Component {

// If the the user clicks a chat it would auto scroll to the current message. 
    componentDidUpdate = () => {
        const container = document.getElementById('chatview-container');
        if (container)
            container.scrollTo(0, container.scrollHeight);
    }

    render() {

        //Const so we dont have to keep calling this.props.chat or this.props.users
        const { chat, user } = this.props;

        // if it is undefined it will display nothing 
        if (chat === undefined) {
            return (<div id='chatview-container'></div>)
        } else {
            // else it displays who im currently chatting with at the top of the chat view 
            return (
                <div class="Messages">
                    {/* This displays currently messaging and the user information */}
                    <div>
                        <div class="Current"> Currently Messaging  {chat.users.filter(_usr => _usr !== user)[0]}</div>
                    </div>

                    {/* This displays the message by the two users */}
                    {
                        chat.messages.map((_msg, _index) => {
                            return (


                                <div class="Text_font" key={_index} class={_msg.sender === this.props.user ? "userSent":"friendSent"}>
                                    {_msg.message}
                                </div>

                            )
                        })
                    }

                </div>

            );

        }
    }
}


//Export  ChatViewComponent.
export default ChatViewComponent;