import React from 'react'
import './index.css'
import Bubbles from './Bubbles'
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
  }

  async componentWillReceiveProps(nextProps) {
    console.log(nextProps)
    if (nextProps.data !== this.props.data) {
      this.setState({data: createNodes(await receiveProps(nextProps.data))})
    }
  }

  componentDidMount() {
    this.setState({data: createNodes(this.props.data)})
  }

  render() {
    return (
      <div className="Keyword">
        <h3 className="text-left ml-3">Keywords</h3>
        <Bubbles width={960} height={480} data={this.state.data} forceStrength={0.03} center={{x: 480, y: 240}} />
      </div>
    )
  }

}
