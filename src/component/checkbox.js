import React from 'react';

export default class CheckboxComponent extends React.Component{
  render(){
    return (
      <div className={this.props.className + " custom-control custom-checkbox"}>
        <input type="checkbox" className="custom-control-input" id={this.props.id}/>
        <label className="custom-control-label" htmlFor={this.props.id}>
          { this.props.name }
          <p className="display-inline thick"> { this.props.number } </p>
        </label>
      </div>
    );
  } 
}
