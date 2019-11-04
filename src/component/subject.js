import React from 'react';
import * as d3 from 'd3'

export default class SubjectComponent extends React.Component{
  state = {
  }
  render(){
    return (
      <div className={this.props.className}>
        <h3 className="text-left ml-3">Keywords</h3>
      </div>
    );
  } 
}


