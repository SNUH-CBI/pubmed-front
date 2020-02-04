import React from 'react'
import * as d3 from 'd3'
import tooltip from './Tooltip'

import './Bubbles.css'

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
    return -this.props.forceStrength * (d.radius[this.props.year] ** 2.0)
  }

  updateBubbles = () => {
    this.state.bubbles
      .transition().duration(500).attr('r', d => d.radius[this.props.year]).on('end', () => {
        this.simulation.nodes(this.props.data)
        .alpha(1)
        .restart()
      })
  }

  renderBubbles(data) {
    if (!this.state.g) return
    this.state.g.selectAll('.bubble').remove()
    const bubbles = this.state.g.selectAll('.bubble').data(data, d => d.id)
    const color = d3.scaleOrdinal(d3.schemeCategory20)

    // Exit
    bubbles.exit().remove()

    // Enter
    const bubblesE = bubbles.enter().append('circle')
      .classed('bubble', true)
      .attr('r', 0)
      .attr('cx', d => d.x)
      .attr('cy', d => d.y)
      .attr('fill', (d,i) => {
        d.color = color(i).toString()
        return d.color
      })
      .attr('stroke', d => d3.rgb(d.color).darker())
      .attr('stroke-width', 2)
      .on('mouseover', d => showDetail(d, this.props.year))  // eslint-disable-line
      .on('mouseout', hideDetail) // eslint-disable-line

    this.setState({ bubbles: bubblesE })
    bubblesE.transition().duration(500).attr('r', d => d.radius[this.props.year]).on('end', () => {
      this.simulation.nodes(data).alpha(1).restart();
    })
  }

  render() {
    const { width, height } = this.props
    return (
      <div>
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
