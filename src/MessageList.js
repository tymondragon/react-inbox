import React, { Component } from 'react'
import Message from './Message'

const MessageList = ({
  messages,
  selectionClick
}) => {
  let eachMessage = messages.map((message,i)=>
      <Message
          key= {i}
          message= { message }
          id={ message.id }
          selectionClick={ selectionClick }
        />)
    return (<div>
            { eachMessage }
          </div>
        )
}

export default MessageList