import React from 'react';

export default class ResultComponent extends React.Component{
  // TODO: change style
  state = {
    title: this.props.data.Title,
    Article: this.props.data.ArticleTitle,
    Author: this.props.data.Author.map((value)=> {
      return value.ForeName + " " + value.LastName
    }).join(", "),
    PubDate: this.props.data.PubDate
  }
  render(){
    return (
      <div className={this.props.className}>
        {this.state.Article}<br/>
        {this.state.title}<br/>
        {this.state.Author}<br/>
        {this.state.PubDate}<br/>
        <br />
      </div>
    );
  } 
}

