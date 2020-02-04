import React from 'react';

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

  handleSubmit(event){
    event.preventDefault();
    this.props.onSubmit(this.state.value);
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
