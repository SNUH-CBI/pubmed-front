import React from "react";
import { render } from "react-dom";
import $ from "jquery"

import SearchComponent from "./component/search"

class App extends React.Component {
  componentDidMount(){
    $("#overlay").hide()
  }

  render() {
    return (
      <div className="full-screen">
        <nav className="navbar navbar-expand-lg navbar-dark blue lighten-2 mb-4">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand" href="/">Pubmed search</a>
            <SearchComponent/>
          </div>
        </nav>
        <div id="filter-panel"></div>
        <div id="result-panel"></div>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
