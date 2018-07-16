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
  }

  async api(messageIds=[], command="", value=null, label="") {
    let item = {
      messageIds,
      command,
      label,
      [command]: value
    }
    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'PATCH',
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

  bulkBoxButton = () => {
    return (
        this.state.messages.every(m=> m.selected) ? "fa-check-square-o"
        :  this.state.messages.some(m=> m.selected) ? "fa-minus-square-o"
        : "fa-square-o"
      )
  }

  checkAll = () => {
    // let bool = this.state.messages.every(m => m.selected) ? false : true
    // let id = this.state.messages.map(m => m.id)
    // this.api(id, 'selected', bool)
     this.state.messages.every(x=> x.selected) ?
     this.state.messages.map(m => m.selected = false) :
     this.state.messages.map(m => m.selected = true)
     this.setMessages()
  }

  count = () => {
    let length = this.filterMessages(m => m.read===false).length
    return length
  }

//////////////////STARRED-UNSTARRED AND CHECKBOX/////////////
  selectionClick= (id, command) => {
    let messages = this.filterMessages(m => m.id===id)[0]
    let bool = messages[command] ? messages[command] = false : messages[command] = true
    if (command === 'starred') this.api([id], command, bool)
    else if (command === 'selected') this.setMessages()
  }

////////////////ADD-REMOVE LABELS//////////////////
  label = (flag, type) => {
    let command = type === 'Apply label' ? 'addLabel' : 'removeLabel'
    let messages = this.filterMessages(m => m.selected)
    let ids = messages.map(m => m.id)
    this.api(ids, command, undefined, flag)
  }

///////////////////READ OR UNREAD////////////////////////////
  read = (e) => {
    let bool = e.target.id === "read" ? true : false
    let messages = this.filterMessages(m => m.selected)
    let id = messages.map(m => m.id)
    this.api(id, 'read', bool)
  }

////////////DELETE MESSAGE////////////////////////////////////////
  remove = () => {
    let messages = this.filterMessages(m => m.selected)
    let id = messages.map(m => m.id)
    this.api(id, 'delete')
  }

  selectToggle = () => {
    let messages = this.filterMessages(m => m.selected)
    return messages.length > 0 ? true:false
  }

  render() {
    return (
      <div className="container">
        <Toolbar read={ this.read }
                 messages={ this.state.messages }
                 checkAll={ this.checkAll }
                 bulkBoxButton={ this.bulkBoxButton }
                 remove={ this.remove }
                 selectToggle={ this.selectToggle }
                 label={ this.label }
                 count={ this.count }/>
        <MessageList
                 messages={ this.state.messages }
                 selectionClick ={ this.selectionClick }/>
      </div>
    )
  }
}

export default App
