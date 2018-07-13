import React, { Component } from 'react'
import Message from './Message'

class MessageList extends Component {
  render() {
    let eachMessage = this.props.messages.map((message,i)=>
        <Message
            key= {i}
            message= { message }
            id={ message.id }
            hasRead={ this.props.hasRead }
            isStarred={ this.props.isStarred }
            isSelected={ this.props.isSelected }
          />)
    return (<div>
            { eachMessage }
          </div>
        )
      }
}

export default MessageList