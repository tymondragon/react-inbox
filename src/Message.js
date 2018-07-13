import React, { Component } from 'react'

class Message extends Component {
// const hasRead = this.state.messageSeeds.read ${ hasRead ? "read" : "unread" }

  // const link = props.read ? props.read() : props.unread()
  render() {

    let labels = this.props.message.labels.map((label,i)=> <span key={i} className="label label-warning">{label}</span>)
    const starred = "fa-star"
    const unstarred = "fa-star-o"
        return (
          <div
            id={ this.props.message.id }
            className={`row message ${ this.props.message.read ? "read" : "unread" } ${ this.props.message.selected ? 'selected' : ''}`}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input type="checkbox" checked={`${this.props.message.selected ? "checked":""}`} onChange={() => this.props.isSelected(this.props.message.id)}/>
                </div>
                <div className="col-xs-2" >
                  <i className={`star fa ${this.props.message.starred ? starred: unstarred}`}
                     onClick={ () => this.props.isStarred(this.props.message.id)}>
                  </i>
                </div>
              </div>
            </div>
            <div className="col-xs-11">
              {labels}
              <a>
                { this.props.message.subject }
              </a>
            </div>
          </div>
        )
    }
}
export default Message