import React from 'react';

export default class ResultComponent extends React.Component{
  // TODO: change style
  constructor(props){
    super(props)
    this.state = { data: this.props.data }
    this.componentWillReceiveProps = this.componentWillReceiveProps.bind(this)
  }

  componentWillReceiveProps(newProps) {
    this.setState({data: newProps.data})
  }

  render(){
    return (
      <div>
        <h3 className="text-left ml-3">Result</h3>
        {
          this.state.data.map((value, index) => {
            let doc = value._source
            return (
              <div key={index} className={"ml-5"}>
                {doc.ArticleTitle} <br/>
                {doc.Title} <br/>
                {doc.Author.map((value) => {
                  return value.ForeName + " " + value.LastName
                }).join(", ")} <br/>
                {doc.PubDate} <br/>
                <br/>
              </div>
            )
          })
        }
      </div>
    );
  } 
}

