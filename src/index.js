import React from "react";
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./layout/goldenLayoutComponent";
import { MyGoldenPanel } from "./layout/myGoldenPanel";
import { AppContext } from "./layout/appContext";

import $ from 'jquery'
import testES from "./api/test";

class App extends React.Component {
  state = { contextValue: "default value" };

  // Test code
  componentDidMount(){
    testES().then(function(response){
      $("#test-id").val(response.result.body.hits.hits[0]._source.Title)
    })
  }

  render() {
    return (
      <div className="full-screen">
        <nav className="navbar navbar-expand-lg navbar-dark blue lighten-2 mb-4">
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <a className="navbar-brand" href="/">Pubmed search</a>
            <form className="form-inline mr-auto">
              <input id="test-id" className="form-control width-500-px" type="text" placeholder="Search" aria-label="Search"
                value={this.state.contextValue}
                onChange={e => {
                  this.setState({ contextValue: e.target.value });
                }}
              />
              <button className="btn btn-mdb-color btn-rounded btn-sm my-0 ml-sm-2" type="submit">Search</button>
            </form>
          </div>
        </nav>
        <AppContext.Provider value={this.state.contextValue}>
          <GoldenLayoutComponent
            htmlAttrs={{ style: { height: "90%", width: "100%" } }}
            config={{
              content: [
                {
                  type: "row",
                  content: [
                    {
                      title: "A react component",
                      type: "react-component",
                      component: "testItem",
                      props: { value: "left one" }
                    },
                    {
                      title: "Another react component",
                      type: "react-component",
                      component: "testItem"
                    }
                  ]
                }
              ]
            }}
            registerComponents={myLayout => {
              myLayout.registerComponent("testItem", MyGoldenPanel);
            }}
          />
        </AppContext.Provider>
      </div>
    );
  }
}

render(<App />, document.getElementById("root"));
