import React, { Component } from 'react'
import Message from './Message'
const MessageList = (props) => {
  let messageList = props.messages.map((message,i)=> < Message key= {i} message= { message } />)
  return (<div>
            { messageList }
         </div>)
}

export default MessageList