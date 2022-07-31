import React, { Component, useState } from 'react';
import PropTypes from 'prop-types'
import './ChatBubble.css';


function ChatBubble(props) {
    const [newMessage, setNewMessage] = useState('')

    function getConversations(messages){
        if (messages == undefined) {
            return;
        }

        const listItems = messages.map((message, index) => {
            let bubbleClass = 'me';
            let bubbleDirection = '';

            if (message.type === 0) {
                bubbleClass = 'you';
                bubbleDirection = "bubble-direction-reverse";
            }
            return (
                <div className={`bubble-container ${bubbleDirection}`} key={index}>
                    <img className={`img-circle`} src={message.image} />
                    <div className={`bubble ${bubbleClass}`}>{message.text}</div>
                </div>
            );
        });
        return listItems;
    }

    const handleSubmit = e => {
        e.preventDefault()

        // const {props: {onNewMessage}, state: {newMessage}} = this
        const onNewMessage = props.onNewMessage

        if (onNewMessage && newMessage) {
            onNewMessage(newMessage)
        }
        setNewMessage('')
    }

    const handleInputChange = e => setNewMessage(e.target.value)

    // const {props: {messages}, state: {newMessage}} = this;
    const messages = props.messages;
    const chatList = getConversations(messages);
    return (
        <div className="chats">
            <div className="chat-list">
                {chatList}
            </div>
            <form
                className="new-message"
                onSubmit={handleSubmit}
            >
                <input
                    value={newMessage}
                    placeholder="Write a new message"
                    onChange={handleInputChange}
                    className="new-message-input"
                />
            </form>
        </div>
    );

}

ChatBubble.propTypes = {
    messages: PropTypes.array.isRequired,
    onNewMessage: PropTypes.func.isRequired,
};

export default ChatBubble;