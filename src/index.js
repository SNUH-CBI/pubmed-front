import React, { useContext } from "react";
import { render } from "react-dom";

import YearComponent from "./component/barchart"
import SearchComponent from "./component/search"
import KeywordComponent from './component/keyword'
import AuthorComponent from './component/author'
import JournalComponent from './component/journal'
import MapComponent from "./component/map";

// Hook
import { useResult } from './hook/useResult';

function App(){
  const {result, initialize} = useResult();

  return (
    <div className="full-screen">
      <nav className="navbar navbar-expand-lg navbar-dark blue lighten-2 mb-4">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand" href="/">Pubmed search</a>
          <SearchComponent onSubmit={(v)=>initialize(v)} />
        </div>
      </nav>
      <YearComponent data={result.barchart}/>
    </div>
  );
}

/*
class App extends React.Component {
  constructor(props) {
    super(props);
    this.state={
      YearData: [],
      SubjectData: [],
      MapData: {},
      JournalData: [],
      AuthorData: []
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
        YearData: response.result.body.aggregations.group_by_state.buckets.reverse(),
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
    mapSearch(search_str).then((response) => {
      if(!response.success){
        alert("error")
        return
      }
      const mapped = response.result.map(item => ({ [item.abbr]: item.count }))
      this.setState({MapData: Object.assign({}, ...mapped )})
    })
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
        <YearComponent data={this.state.BarchartData}/>
        <KeywordComponent data={this.state.SubjectData}/>
        <MapComponent data={this.state.MapData}/>
        <AuthorComponent data={this.state.AuthorData}/>
        <JournalComponent data={this.state.JournalData}/>
      </div>
    );
  }
}
*/

render(<App />, document.getElementById("root"));
