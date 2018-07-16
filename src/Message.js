import React, { Component } from 'react'

const Message = ({
  message,
  id,
  selectionClick
}) => {
    let labels = message.labels.map((label,i)=> <span key={i} className="label label-warning">{label}</span>)
    const starred = "fa-star"
    const unstarred = "fa-star-o"
        return (
          <div
            id={ message.id }
            className={`row message ${ message.read ? "read" : "unread" } ${ message.selected ? 'selected' : ''}`}>
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input type="checkbox" checked={`${message.selected ? "checked":""}`} onChange={() => selectionClick(message.id, "selected")}/>
                </div>
                <div className="col-xs-2" >
                  <i className={`star fa ${message.starred ? starred: unstarred}`}
                     onClick={ () => selectionClick(message.id, "starred")}>
                  </i>
                </div>
              </div>
            </div>
            <div className="col-xs-11">
              {labels}
              <a>
                { message.subject }
              </a>
            </div>
          </div>
        )
    }

export default Message