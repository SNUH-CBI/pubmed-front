import React from 'react';

const ImpactFactor ={
  title: "Impact Factor",
  options: [
    { value: "All"   },
    { value: "50+"   },
    { value: "100+"  },
    { value: "500+"  },
    { value: "1000+" }
  ]
}

const ArticleType = {
  title: "Article Type",
  options: [
    { value: "Books and Document"          },
    { value: "Clinical Trial"              },
    { value: "Meta-Analysis"               },
    { value: "Randomized Controlled Trial" },
    { value: "Review"                      },
    { value: "Systematic Reviews"          }
  ]
}

export default class FilterComponent extends React.Component{
  state = {
    filter: [ ImpactFactor, ArticleType ]
  } 
  render(){
    return(
      <React.Fragment>
        <form>
          <div className="form-row"> {
            this.state.filter.map((value, index) => { return (
              <div className="col" key={ index }>
                <span>{ value.title }</span>
                <select className="browser-default custom-select"> {
                  value.options.map((option, index) => { return (
                    <option value={ option.value } key={ index }>
                      { option.value }
                    </option>
                  )})
                }
                </select>
              </div>
            )})
          }
          <button type="button" className="btn btn-deep-orange">Apply</button>
          <button type="button" className="btn btn-dark-green">Search</button>
          </div>
        </form>
      </React.Fragment>
    )
  }
}