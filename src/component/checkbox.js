import React from 'react';

export default class CheckboxComponent extends React.Component{
  render(){
    return (
      <div className={this.props.className + " custom-control custom-checkbox"}>
        <input type="checkbox" className="custom-control-input" id="defaultUnchecked"/>
        <label className="custom-control-label" htmlFor="defaultUnchecked">
          { this.props.name }
          <p className="display-inline thick"> { this.props.number } </p>
        </label>
      </div>
    );
  } 
}
