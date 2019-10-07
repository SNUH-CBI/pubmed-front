import React from 'react';
import Chart from 'chart.js';

const red = "rgb(255, 99, 132)"
const transRed = Chart.helpers.color("rgb(255, 99, 132)").alpha(0.4).rgbString()

export default class BarChartComponent extends React.Component{
  chartRef = React.createRef();
  state = {
    length: this.props.data.length,
    labels: this.props.data.map((value, key) => {return value.key}),
    values: this.props.data.map((value, key) => {return value.doc_count}),
    clicked: false
  } 
  componentDidMount() {
    const myChartRef = this.chartRef.current.getContext("2d")
    let chart = new Chart(myChartRef, {
      type: 'bar',
      data: {
        labels: this.state.labels,
        datasets: [
          {
            label: "publication: ",
            backgroundColor: Array(this.state.length).fill(transRed),
				    borderColor: red,
            data: this.state.values
          }
        ]
      },
      options: {
        maintainAspectRatio: false,
        legend: { display: false },
        title: { display: false },
        onClick: (e, item) => {
          if (!this.state.clicked && item[0]){
            chart.data.datasets[0].backgroundColor = Array(this.state.length).fill(transRed)
            this.setState({ clicked: true })
            chart.data.datasets[0].backgroundColor[item[0]._index] = red
            chart.update()
          } else if (this.state.clicked) {
            this.setState({ clicked: false })
          }
        },
        onHover: (e, item) => {
          if (this.state.clicked && item[0]){
            chart.data.datasets[0].backgroundColor[item[0]._index] = red
            chart.update()
          }
        }
      }
    })
  }
  render(){
    return (
      <div className={this.props.className}>
        <canvas id="barChart" ref={ this.chartRef } />
      </div>
    )
  } 
}
