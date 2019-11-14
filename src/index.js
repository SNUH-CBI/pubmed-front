import React from "react";
import { render } from "react-dom";
import $ from "jquery"

import BarchartComponent from "./component/barchart"
import SearchComponent from "./component/search"
import ResultComponent from "./component/result"
import KeywordComponent from './component/keyword'

// API
import basicSearch from "./api/basic-search"
import keywordSearch from "./api/keyword-search"
import MapComponent from "./component/map";

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      BarchartData: [],
      ResultData: [],
      SubjectData: [],
      MapData: {}
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }
  componentDidMount(){
    $("#overlay").hide()
  }

  handleSubmit(event, search_str){
    event.preventDefault()
    basicSearch(search_str).then((response) => {
      if (!response.success){
        alert("error")
        return
      }
      this.setState({
        BarchartData: response.result.body.aggregations.group_by_state.buckets.reverse(),
        ResultData: response.result.body.hits.hits,
      })
    })
    keywordSearch(search_str).then((response) => {
      if(!response.success){
        alert("error")
        return
      }
      this.setState({ SubjectData: response })
    })
    this.setState({MapData: {
      AF: 16.63,
      AL: 11.58,
      DZ: 158.97
    }})
  }

  render() {
    return (
      <div className="full-screen">
        <nav className="navbar navbar-expand-lg navbar-dark blue lighten-2 mb-4">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand" href="/">Pubmed search</a>
            <SearchComponent onSubmit={this.handleSubmit} />
          </div>
        </nav>
        <BarchartComponent data={this.state.BarchartData}/>
        <KeywordComponent data={this.state.SubjectData}/>
        <MapComponent data={this.state.MapData}/>
        <ResultComponent data={this.state.ResultData}/>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
