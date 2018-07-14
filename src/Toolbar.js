import React, { Component } from 'react'

const Toolbar = (props) => {

  const noMessage = <div className="row toolbar">
      <div className="col-md-12">
        <p className="pull-right">
          <span className="badge badge">{ props.count() }</span>
          unread messages
        </p>

        <button className="btn btn-default"
                onClick={ props.checkAll }>
          <i className={`fa ${ props.bulkBoxButton() }`}></i>
        </button>

        <button className="btn btn-default"
                disabled={`${props.selectToggle() ? "" : "disabled"}`}
                onClick={ props.hasRead }>
          Mark As Read
        </button>

        <button className="btn btn-default"
                disabled={`${props.selectToggle() ? "" : "disabled"}`}
                onClick={ props.unRead }>
          Mark As Unread
        </button>

        <select className="form-control label-select" disabled={`${props.selectToggle() ? "" : "disabled"}`} onChange={ (e)=> {props.addLabel(e.target.value)} }>
          <option>Apply label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <select className="form-control label-select" disabled={`${props.selectToggle() ? "" : "disabled"}`} onChange={ (e)=> {props.removeLabel(e.target.value)} }>
          <option>Remove label</option>
          <option value="dev">dev</option>
          <option value="personal">personal</option>
          <option value="gschool">gschool</option>
        </select>

        <button className="btn btn-default"
                disabled={`${props.selectToggle() ? "" : "disabled"}`}
                onClick= { props.delete }>
          <i className="fa fa-trash-o"></i>
        </button>
      </div>
    </div>
return noMessage

}
export default Toolbar