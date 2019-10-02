import React from "react";
import { render } from "react-dom";
import { GoldenLayoutComponent } from "./layout/goldenLayoutComponent";
import { MyGoldenPanel } from "./layout/myGoldenPanel";
import { AppContext } from "./layout/appContext";
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
        <AppContext.Provider>
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
