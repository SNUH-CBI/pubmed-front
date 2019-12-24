import Chart from 'chart.js';
import React from 'react';
import 'chartjs-plugin-annotation'
import 'chartjs-plugin-draggable'

class Lines extends React.Component {
  state = {
    chart: null,
    pos: 0,
    datasets: null
  }

  componentDidUpdate(prevProps) {
    if (this.props.year !== prevProps.year || this.props.data !== prevProps.data)
      this.updateLine()
  }

  componentDidMount() {
    this.getChart(this.props)
  }

  getChart = (props) => {
    let ctx = document.getElementById('lineChart').getContext('2d');
    if (this.state.chart) this.state.chart.destroy()
    const years = props.years
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: years,
        datasets: this.state.datasets,
      },
      options: {
        animation: false,
        scales: {
          xAxes: [{
            id: 'x-axis-0',
            ticks: {
              max: years[years.length - 1],
              min: years[0],
              stepSize: 1
            }
          },
          {
            id: 'x-for-line',
            ticks: {
              max: years[years.length - 1],
              min: years[0]
            },
            type: 'linear',
            display: false,
          }
        ]
        },
        maintainAspectRatio: false,
        annotation: {
          drawTime: 'afterDraw',
          events: ['click', 'mouseover'],
          annotations: [{
            drawTime: 'afterDraw',
            id: 'verticalLine',
            type: 'line',
            mode: 'vertical',
            scaleID: 'x-for-line',
            value: Math.round(this.state.pos),
            borderColor: "grey",
            borderWidth: 5,
            draggable: true,
            onDrag: (e) => {
              this.setState({ pos: e.subject.config.value })
            },
            onDragEnd: (e) => {
              this.props.onHandleYearChange(Math.round(e.subject.config.value))
            },
            onMouseover: function(e) {
              this.options.borderColor = "black"
              this.chartInstance.update()
            },
            onMouseout: function(e) {
              this.options.borderColor = "grey"
              this.chartInstance.update()
            }
          }]
        }
      },
      tooltips: {
        mode: 'index',
      }
    })
    this.setState({ chart: chart, pos: props.year })
  }

  updateLine = () => {
    let indexno = -1
    if (this.props.data.length !== 0) {
      indexno = this.props.years.indexOf(this.props.year)
    }
    this.setState({
      datasets: this.props.data.map((elem) => {
        return {
          label: elem.name,
          data: Object.values((({ key, ...others }) => ({ ...others }))(elem.value)),
          borderColor: elem.color,
          fill: false,
          lineTension: 0,
        }
      })
        .sort(function (a, b) {
          if (a.data[indexno] > b.data[indexno]) return 1;
          if (a.data[indexno] < b.data[indexno]) return -1;
          return 0;
        })
        .splice(-5, 5)
    },
    () => this.setState({ pos: this.props.year },
    () => this.getChart(this.props)))
  }

  render() {
    const { width, height } = this.props
    return (
      <div id="lineChart-div" className="basic-margin">
        <canvas id="lineChart" width={width} height={height} />
      </div>
    )
  }
}

export default Lines;