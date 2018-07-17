import React, { Component } from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'
import Compose from "./Compose"
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
    // let item = {}
    // if (method === "POST") {item = {...this.state.compose} }
    // else if (method === "PATCH")
    let item = {messageIds, command, label, [command]: value}
    // console.log(item, "is Item")
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
    // method === "PATCH" ? this.setState({messages: message})
    // : this.setState({messages: [...this.state.messages, message]})
  }

  async postMessage(item) {
    const response = await fetch(`http://localhost:8082/api/messages`, {
      method: 'POST',
      body: JSON.stringify(item),
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json',
      }
    })
    const message = await response.json()
    this.setState({messages: [...this.state.messages, message]})
    this.composeButton()
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
    let bool = this.state.messages.every(m => m.selected) ? false : true
    let id = this.state.messages.filter(m => m.selected === !bool).map(m => m.id)
    this.api(id, 'selected', bool)
  }

  composeButton = () =>
  this.state.show ? this.setState({show: false}) : this.setState({show: true})

  count = () => {
    let length = this.filterMessages(m => m.read===false).length
    return length
  }

//////////////////STARRED-UNSTARRED AND CHECKBOX/////////////
  selectionClick= (id, command) => {
    let messages = this.filterMessages(m => m.id===id)[0]
    let bool = messages[command] ? messages[command] = false : messages[command] = true
    this.api([id], command, bool)
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
    this.api(id, 'read', bool )
  }

////////////DELETE MESSAGE////////////////////////////////////////
  remove = () => {
    let messages = this.filterMessages(m => m.selected)
    let id = messages.map(m => m.id)
    this.api(id, 'delete')
  }

  bodyAndSubject = (e) => {
    let item = {
      ...this.state.compose,
      [e.target.id] : e.target.value
    }
    if (item[e.target.id]) this.setState({compose:{...item}})
  }

  sendButton = (e) => {
    e.preventDefault()
    let item = this.state.compose
    console.log(item)
    if (item !== undefined && item.hasOwnProperty('subject') && item.hasOwnProperty('body')) {
      this.postMessage(item)
    }
    else{ sendButton()}
    this.setState({compose:undefined})
  }

  toggle = () => {
    let messages = this.filterMessages(m => m.selected)
    return messages.length > 0 ? true:false
  }

  render() {
    const composeForm = this.state.show ?
      <Compose sendButton={ this.sendButton }
               bodyAndSubject={ this.bodyAndSubject }/> : ""

    return (
      <div className="container">
        <Toolbar read={ this.read }
                 checkAll={ this.checkAll }
                 bulkBoxButton={ this.bulkBoxButton }
                 remove={ this.remove }
                 toggle={ this.toggle }
                 label={ this.label }
                 count={ this.count }
                 composeButton={ this.composeButton }/>

        { composeForm }

        <MessageList
                 messages={ this.state.messages }
                 selectionClick ={ this.selectionClick }/>
      </div>
    )
  }
}

export default App
