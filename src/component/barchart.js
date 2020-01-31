import React from 'react';
import Chart from 'chart.js';

const red = "rgb(255, 99, 132)"
const transRed = Chart.helpers.color(red).alpha(0.4).rgbString()

const blue = "rgb(132, 100, 255)"
const transBlue = Chart.helpers.color(blue).alpha(0.4).rgbString()

function setBgColor(_chart, _color, _index=-1){
  if (_index === -1)
    _chart.data.datasets[0].backgroundColor = _color
  else
    _chart.data.datasets[0].backgroundColor[_index] = _color
}

export default class BarChartComponent extends React.Component{
  constructor(props){
    super(props)
    this.chartRef = React.createRef()
    this.state = {
      chart: null,
      click: { on: false, index: -1, year: -1 },
      totalPub: 0
    }
  }

  getChart = (props, ref) => {
    let state = {
      chartObj: null,

      length: props.data.length,
      labels: props.data.map((value, key) => {return value.key}),
      values: props.data.map((value, key) => {return value.doc_count}),
    }
    if (this.state.chart) this.state.chart.destroy()
    let chart = new Chart(ref, {
      type: 'bar',
      data: {
        labels: state.labels,
        datasets: [
          {
            backgroundColor: Array(state.length).fill(blue),
          borderColor: blue,
            data: state.values
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        title: { display: false },
        onClick: (e, item) => {
          if (!this.state.click.on && item[0]){
            let [index, year] = [item[0]._index, item[0]._view.label]

            setBgColor(chart, Array(state.length).fill(transBlue))
            this.setState({ click: {
                on: true,
                index: index,
                year: year,
              },
              totalPub: state.values[index]
            })
            setBgColor(chart, blue, index)

            chart.update()
          }
          else if (this.state.click.on) {
            this.setState({ click: { on: false } })
          }
        },
        onHover: (e, item) => {
          if (this.state.click.on && item[0]){
            let _index = item[0]._index
            let [from, to] = [this.state.click.index, _index].sort()
            let total = 0

            setBgColor(chart, Array(state.length).fill(transBlue))
            for (let i = from; i <= to; i++){
              total += state.values[i]
              setBgColor(chart, blue, i)
            }
            this.setState({ totalPub: total })

            chart.update()
          }
        },
        tooltips: {
          callbacks: {
            title: (tti, data) => {
              if (this.state.click.on)
                return [this.state.click.year, tti[0].label].sort().join(" ~ ")
              else
                return tti[0].label
            },
            label: (tti, data) => {
              if (this.state.click.on)
                return "Pub. number : " + this.state.totalPub
              else
                return "Pub. number: " + tti.yLabel
            }
          }
        }
      }
    })
    this.setState({chart: chart})
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      chart: null,
      click: { on: false, index: -1, year: -1 },
      totalPub: 0
    })
    this.getChart(newProps, this.chartRef.current.getContext("2d"))
  }

  componentDidMount() {
    this.getChart(this.props, this.chartRef.current.getContext("2d"))
  }

  render(){
    return (
      <div>
        <h3 className="text-left ml-3">Years</h3>
        <div id="barchart-div" className="barchart basic-margin">
          <canvas id="barChart" ref={ this.chartRef } />
        </div>
      </div>
    )
  } 
}
