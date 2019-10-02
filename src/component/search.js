import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery"

// API
import basicSearch from "../api/basic-search";

// Component
import CheckboxComponent from "../component/checkbox"
import ResultComponent from "../component/result"

export default class SearchComponent extends React.Component{
  constructor(props){
    super(props);
    this.state = { value: "" }

    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleChange(event) {
    this.setState({value: event.target.value});
  }
  
  handleSubmit(event) {
    event.preventDefault()
    $("#overlay").show()
    // TODO: change jquery style into React.Component
    ReactDOM.unmountComponentAtNode(document.getElementById('filter-panel'))
    ReactDOM.unmountComponentAtNode(document.getElementById('result-panel'))
    basicSearch(this.state.value).then(function(response){
      if (!response.success){
        alert(response.result.error)
        return
      }
      let srch_result = response.result.body.hits.hits
      let aggr_result = response.result.body.aggregations.group_by_state.buckets
      ReactDOM.render(
        <div>
          <h3 className="text-left ml-3">Years</h3>
          {
            aggr_result.map((value, index) => {
              return (
                <CheckboxComponent
                  className="ml-5"
                  name={value.key}
                  number={value.doc_count}
                  id={"checkbox" + index}
                />
              )
            })
          }
        </div>
        , document.getElementById('filter-panel')
      )
      ReactDOM.render(
        <div>
          <h3 className="text-left ml-3">Result</h3>
          {
            srch_result.map((value, index) => {
              return (
                <ResultComponent
                  className="ml-5"
                  data={value._source}
                />
              )
            })
          }
        </div>
        , document.getElementById('result-panel')
      )
    }).then($("#overlay").hide())
  }

  render() {
    return(
      <form className="form-inline mr-auto" onSubmit={this.handleSubmit}>
        <input
          id="search-input"
          className="form-control width-500-px"
          type="text"
          placeholder="Search"
          aria-label="Search"
          onChange={this.handleChange}
          defaultValue={this.state.value}
        />
        <button className="btn btn-mdb-color btn-rounded btn-sm my-0 ml-sm-2" type="submit" value="Submit">Search</button>
      </form>
    )
  }

}