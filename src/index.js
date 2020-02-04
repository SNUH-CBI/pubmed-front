import React, { useContext } from "react";
import { render } from "react-dom";

import YearComponent from "./component/barchart"
import SearchComponent from "./component/search"

// Hook
import { useResult } from './hook/useResult';

function App(){
  const {result, initialize} = useResult();

  return (
    <div className="full-screen">
      <nav className="navbar navbar-expand-lg navbar-dark blue lighten-2 mb-4">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <a className="navbar-brand" href="/">Pubmed search</a>
          <SearchComponent onSubmit={initialize} />
        </div>
      </nav>
      <YearComponent data={result.year}/>
    </div>
  );
}


render(<App />, document.getElementById("root"));
