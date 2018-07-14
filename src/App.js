import React, { Component } from 'react'
import MessageList from './MessageList'
import Toolbar from './Toolbar'

const seeds = [
  {
    "id": 1,
    "subject": "You can't input the protocol without calculating the mobile RSS protocol!",
    "read": false,
    "starred": true,
    "selected": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 2,
    "subject": "connecting the system won't do anything, we need to input the mobile AI panel!",
    "read": false,
    "starred": false,
    "selected": false,
    "labels": []
  },
  {
    "id": 3,
    "subject": "Use the 1080p HTTP feed, then you can parse the cross-platform hard drive!",
    "read": false,
    "starred": true,
    "selected": false,
    "labels": ["dev"]
  },
  {
    "id": 4,
    "subject": "We need to program the primary TCP hard drive!",
    "read": true,
    "starred": false,
    "selected": false,
    "labels": []
  },
  {
    "id": 5,
    "subject": "If we override the interface, we can get to the HTTP feed through the virtual EXE interface!",
    "read": false,
    "starred": false,
    "selected": false,
    "labels": ["personal"]
  },
  {
    "id": 6,
    "subject": "We need to back up the wireless GB driver!",
    "read": true,
    "starred": true,
    "selected": false,
    "labels": ["gschool"]
  },
  {
    "id": 7,
    "subject": "We need to index the mobile PCI bus!",
    "read": true,
    "starred": false,
    "selected": false,
    "labels": ["dev", "personal"]
  },
  {
    "id": 8,
    "subject": "If we connect the sensor, we can get to the HDD port through the redundant IB firewall!",
    "read": true,
    "starred": true,
    "selected": false,
    "labels": []
  }
]

class App extends Component {
  constructor(props) {
    super(props)
    this.state = { seeds: seeds }
  }

/////refactored stuff///////

  setMessages = () => this.setState({seeds: this.state.seeds})
  filterMessages = (x) => this.state.seeds.filter(x)

////////////////////////////

  delete = () => {
    let messages = this.filterMessages(m => !m.selected)
    this.setState({seeds: messages})
  }

  selectToggle = () => {
    let messages = this.filterMessages(m => m.selected)
    return messages.length > 0 ? true:false
  }

  bulkBoxButton = () => {
    return (
        this.state.seeds.every(m=> m.selected) ? "fa-check-square-o"
        :  this.state.seeds.some(m=> m.selected) ? "fa-minus-square-o"
        : "fa-square-o"
      )
  }

  checkAll = () => {
    this.state.seeds.every(m=> m.selected) ?
    this.state.seeds.map(m => m.selected = false) :
    this.state.seeds.map(m => m.selected = true)
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
    messages.map(m => { if (m.labels.some(x => x === value)) m.labels.splice(m.labels.indexOf(value),1) } )
    this.setMessages()
  }
  isStarred = (id) => {
    let messages = this.filterMessages(m => m.id===id)[0]
    messages.starred ? messages.starred = false : messages.starred = true
    this.setMessages()
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
                 messages={ this.state.seeds }
                 checkAll={ this.checkAll }
                 bulkBoxButton={ this.bulkBoxButton }
                 delete={ this.delete }
                 selectToggle={ this.selectToggle }
                 addLabel={ this.addLabel }
                 removeLabel={ this.removeLabel }
                 count={ this.count }/>
        <MessageList
                 messages={ this.state.seeds }
                 hasRead = { this.hasRead }
                 isStarred ={ this.isStarred }
                 isSelected ={ this.isSelected }/>
      </div>
    )
  }
}

export default App
