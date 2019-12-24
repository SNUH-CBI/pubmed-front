import React from 'react'
import './index.css'
import Bubbles from './Bubbles'
import Lines from './Lines'
import { createNodes } from './utils'

const receiveProps = async (data) => {
  let result = []
  if (data && data.result){
    const years = data.year
    const keywords = data.result.keyword
    const promises = Object.keys(keywords).map(function(key){
      let node = {}
      keywords[key].forEach((v, i) => { node[years[i]] = v })
      return {"key": key, ...node}
    })
    result = await Promise.all(promises)
  }
  return result
}

export default class KeywordComponent extends React.Component {
  state = {
    data: [],
    grouping: 'all',
    year: 2017,
    years: [2017]
  }

  handleYearChange = (year) => {
    this.setState({year: year});
    this.updateBubble();
    this.updateLine();
  }

  updateLine = () => {
    this.refs.Lines.updateLine()
  }

  updateBubble = () => {
    this.refs.bubbles.updateBubbles(this.state.data)
  }

  async componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.setState({
        years: nextProps.data.year,
        data: createNodes(await receiveProps(nextProps.data))
      })
    }
  }

  render() {
    const {data, years, year} = this.state;
    return (
      <div className="Keyword">
        <h3 className="text-left ml-3">Keywords</h3>
        <h1>{ year }</h1>
        <Lines
          ref="Lines"
          width={960} height={480}
          data={data} onHandleYearChange={this.handleYearChange}
          years={years} year={year}
        />
        <Bubbles
          ref="bubbles"
          width={960} height={480}
          data={data} onHandleYearChange={this.handleYearChange}
          forceStrength={0.03} center={{x: 480, y: 240}}
          years={years} year={year}
        />
      </div>
    )
  }

}
