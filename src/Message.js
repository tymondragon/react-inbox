import React, {Component} from 'react'

const Message = (props) => {
  console.log(props)
  return (
          <div className="row message unread">
            <div className="col-xs-1">
              <div className="row">
                <div className="col-xs-2">
                  <input type="checkbox"/>
                </div>
                <div className="col-xs-2">
                  <i className="star fa fa-star-o"></i>
                </div>
              </div>
            </div>
            <div className="col-xs-11">
              <a href="#">
                { props.message.subject }
              </a>
            </div>
          </div>
        )
}
export default Message