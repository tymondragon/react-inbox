import React, { Component } from 'react'

const Toolbar = ({
  read,
  checkAll,
  bulkBoxButton,
  remove,
  toggle,
  label,
  count,
  composeForm,
  composeButton
}) => {

  return (

     <div className="row toolbar">
      <div className="col-md-12">

        <a className="btn btn-danger" onClick={ composeButton }  data-target="compose">
          <i className="fa fa-plus"></i>
        </a>

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
                disabled={`${ toggle() ? "" : "disabled" }`}
                onClick={ read }>
          Mark As Read
        </button>

        <button id="unread"
                className="btn btn-default"
                disabled={`${ toggle() ? "" : "disabled" }`}
                onClick={ read }>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={`${ toggle() ? "" : "disabled" }`} onChange={ (e)=> { label(e.target.value, e.target[0].value)} }>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={`${ toggle() ? "" : "disabled" }`} onChange={ (e)=> { label(e.target.value, e.target[0].value)} }>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default"
                disabled={`${ toggle() ? "" : "disabled" }`}
                onClick= { remove }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
  )
}
export default Toolbar