import React, { Component } from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {messages:[]}
  }

  async componentDidMount() {
    const response = await fetch('http://localhost:8082/api/messages')
    const json = await response.json()
    this.setState({messages: json})
    console.log("All of the gets!", json)
  }

  async apiP(id, prop, boolean, method) {
    let item = {
      messageIds: [id],
      command: prop,
      [prop]: boolean
    }
    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: method,
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    this.setState({messages: message})
  }

/////refactored stuff///////

  setMessages = () => this.setState({messages: this.state.messages})
  filterMessages = (x) => this.state.messages.filter(x)

////////////////////////////

  delete = () => {
    let messages = this.filterMessages(m => !m.selected)
    this.setState({messages: messages})
  }

  selectToggle = () => {
    let messages = this.filterMessages(m => m.selected)
    return messages.length > 0 ? true:false
  }

  bulkBoxButton = () => {
    return (
        this.state.messages.every(m=> m.selected) ? "fa-check-square-o"
        :  this.state.messages.some(m=> m.selected) ? "fa-minus-square-o"
        : "fa-square-o"
      )
  }

  checkAll = () => {
    this.state.messages.every(m=> m.selected) ?
    this.state.messages.map(m => m.selected = false) :
    this.state.messages.map(m => m.selected = true)
    this.setMessages()
  }

  hasRead = () => {
    let messages = this.filterMessages(m => m.selected)
    messages.map(m => m.read = true)
    this.setMessages()
  }

  unRead = () => {
    let messages = this.filterMessages(m => m.selected)
    messages.map(m => m.read = false)
    this.setMessages()
  }

  addLabel = (value) => {
    let messages = this.filterMessages(m => m.selected)
    messages.map(m => { if (!m.labels.some(x => x === value) && value != 'Apply label') m.labels.push(value) } )
    this.setMessages()
  }

  removeLabel = (value) => {
    let messages = this.filterMessages(m => m.selected)
    messages.map(m => {if (m.labels.some(x => x === value))
      return m.labels.splice(m.labels.indexOf(value),1)
      }
    )
    this.setMessages()
  }
  isStarred = (id) => {
    let messages = this.filterMessages(m => m.id===id)[0]
    let boolean = messages.starred ? messages.starred = false : messages.starred = true
    this.apiP([id], "starred", boolean, "PATCH")

  }

  isSelected = (id) => {
    let message = this.filterMessages(m => m.id===id)[0]
    message.selected ? message.selected = false : message.selected = true
    this.setMessages()
  }

  count = () => {
    let length = this.filterMessages(m => m.read===false).length
    return length
  }

  render() {
    return (
      <div className="container">
        <Toolbar hasRead={ this.hasRead }
                 unRead={ this.unRead }
                 messages={ this.state.messages }
                 checkAll={ this.checkAll }
                 bulkBoxButton={ this.bulkBoxButton }
                 delete={ this.delete }
                 selectToggle={ this.selectToggle }
                 addLabel={ this.addLabel }
                 removeLabel={ this.removeLabel }
                 count={ this.count }/>
        <MessageList
                 messages={ this.state.messages }
                 hasRead = { this.hasRead }
                 isStarred ={ this.isStarred }
                 isSelected ={ this.isSelected }/>
      </div>
    )
  }
}

export default App
