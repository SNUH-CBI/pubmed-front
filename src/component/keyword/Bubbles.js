import React from 'react'
import * as d3 from 'd3'
import { fillColor } from './utils'
import tooltip from './Tooltip'

import './Bubbles.css'

const genSlideStyle = (value) => {
  return {
    point: {
      left: `calc(${value * 20}% - ${5 + 3 * value}px)`,
    },
    range: {
      width: `${value * 20}%`,
    },
  };
};

class RangeSlider extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      value: 2019,
    }
  }
  
  handleChange = (e) => {
    this.setState({ value: e.target.value });
    this.props.onChange(e)
  }
  
  render () {
    const slideStyle = genSlideStyle(this.state.value);
    return (
      <div className="range">
        <span className="range-value" style={slideStyle.range} />
        <span className="circle" style={slideStyle.point} />
        <input
          className="range-slide" name="range" type="range"
          min="2015" max="2019" step="1"
          value={this.state.value} onChange={this.handleChange}
        />
      </div>
    );
  }
}

export default class Bubbles extends React.Component {
  constructor(props) {
    super(props)
    const { forceStrength, center } = props
    this.simulation = d3.forceSimulation()
      .velocityDecay(0.2)
      .force('x', d3.forceX().strength(forceStrength).x(center.x))
      .force('y', d3.forceY().strength(forceStrength).y(center.y))
      .force('charge', d3.forceManyBody().strength(this.charge.bind(this)))
      .on('tick', this.ticked.bind(this))
      .stop()
  }

  state = {
    g: null,
    year: 2019,
    bubbles: null
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.data !== this.props.data) {
      this.renderBubbles(nextProps.data)
    }
  }

  onRef = (ref) => {
    this.setState({ g: d3.select(ref) }, () => this.renderBubbles(this.props.data))
  }

  ticked() {
    this.state.g.selectAll('.bubble')
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
  }

  charge(d) {
    return -this.props.forceStrength * (d.radius[this.state.year] ** 2.0)
  }

  updateBubbles = (data) => {
    this.setState({ year: data.target.value })
    this.state.bubbles
      .transition().duration(500).attr('r', d => d.radius[data.target.value]).on('end', () => {
        this.simulation.nodes(this.props.data)
        .alpha(1)
        .restart()
      })
  }

  renderBubbles(data) {
    if (!this.state.g) return
    this.state.g.selectAll('.bubble').remove()
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)

    // Exit
    bubbles.exit().remove()

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', d => {
        d.color = fillColor()
        return d.color
      })
      .attr('stroke', d => d3.rgb(d.color).darker())
      .attr('stroke-width', 2)
      .on('mouseover', d => showDetail(d, this.state.year))  // eslint-disable-line
      .on('mouseout', hideDetail) // eslint-disable-line

    this.setState({ bubbles: bubblesE })
    bubblesE.transition().duration(500).attr('r', d => d.radius[this.state.year]).on('end', () => {
      this.simulation.nodes(data)
      .alpha(1)
      .restart()
    })
  }

  render() {
    const { width, height } = this.props
    return (
      <div>
        <h1>{ this.state.year }</h1>
        <RangeSlider onChange={this.updateBubbles}/>
        <svg className="bubbleChart" width={width} height={height}>
          <g ref={this.onRef} className="bubbles" />
        </svg>
      </div>
    )
  }
}

export function showDetail(d, year) {
  d3.select(this).attr('stroke', 'black')
  const content = `<span class="name">Title: </span><span class="value">${
                  d.name
                  }</span><br/>` +
                  `<span class="name">Amount: </span><span class="value">${
                  d.value[year]
                  }</span>`

  tooltip.showTooltip(content, d3.event)
}

export function hideDetail(d) {
  d3.select(this)
      .attr('stroke', d3.rgb(d.color).darker())
  tooltip.hideTooltip()
}
