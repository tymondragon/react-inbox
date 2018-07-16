import React, { Component } from 'react'

const Toolbar = ({
  read,
  messages,
  checkAll,
  bulkBoxButton,
  remove,
  selectToggle,
  label,
  count
}) => {

  return (
     <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ count() }</span>
          unread messages
        </p>

        <button className="btn btn-default"
                onClick={ checkAll }>
          <i className={`fa ${ bulkBoxButton() }`}></i>
        </button>

        <button id="read"
                className="btn btn-default"
                disabled={`${selectToggle() ? "" : "disabled"}`}
                onClick={ read }>
          Mark As Read
        </button>

        <button id="unread"
                className="btn btn-default"
                disabled={`${selectToggle() ? "" : "disabled"}`}
                onClick={ read }>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={`${selectToggle() ? "" : "disabled"}`} onChange={ (e)=> { label(e.target.value, e.target[0].value)} }>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={`${selectToggle() ? "" : "disabled"}`} onChange={ (e)=> { label(e.target.value, e.target[0].value)} }>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default"
                disabled={`${selectToggle() ? "" : "disabled"}`}
                onClick= { remove }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar