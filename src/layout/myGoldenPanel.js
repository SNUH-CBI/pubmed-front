import React from "react";

export class MyGoldenPanel extends React.Component {
  render() {
    return (
      <div id={this.props.id} className={this.props.className}> </div>
    );
  }
}
