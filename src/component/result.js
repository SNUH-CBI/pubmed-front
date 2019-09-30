import React from 'react';

export default class ResultComponent extends React.Component{
  render(){
    return (
      <div className={this.props.className}>
        {this.props.data}
      </div>
    );
  } 
}

