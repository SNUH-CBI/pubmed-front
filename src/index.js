import React from "react";
import ReactDOM from 'react-dom';
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./layout/goldenLayoutComponent";
import { MyGoldenPanel } from "./layout/myGoldenPanel";
import { AppContext } from "./layout/appContext";

// API
import testES from "./api/test";

// Component
import CheckboxComponent from "./component/checkbox"
import ResultComponent from "./component/result"

class App extends React.Component {
  state = { contextValue: "default value" };

  // Test code
  componentDidMount(){
    testES().then(function(response){
      ReactDOM.render(
        <div>
          <h3 className="text-left ml-3">Years</h3>
          <CheckboxComponent className="ml-5" name={response.result.body.hits.hits[0]._source.Title} number={10} />
        </div>
        , document.getElementById('filter-panel')
      )
      ReactDOM.render(
        <div>
          <h3 className="text-left ml-3">Result</h3>
          <ResultComponent className="ml-5" data={"IGOOONAMAKKKEKEK"}/>
        </div>
        , document.getElementById('result-panel')
      )
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
                      title: "Filter",
                      type: "react-component",
                      component: "testItem",
                      width: 20,
                      props: { id: "filter-panel", className: "mt-5" }
                    },
                    {
                      title: "Result",
                      type: "react-component",
                      component: "testItem",
                      width: 80,
                      props: { id: "result-panel", className: "mt-5" }
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
