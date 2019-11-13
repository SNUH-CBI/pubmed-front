import Chart from 'chart.js';
import React from 'react';
import 'chartjs-plugin-annotation'
import 'chartjs-plugin-draggable'


function makeDataset(data, index) {
  let indexno = -1
  if (data.length !== 0) {
    indexno = index - 2021 + Object.keys(data[0].value).length
  }
  let arr = data.map((elem) => {
    return {
      label: elem.name,
      data: Object.values((({ key, ...others }) => ({ ...others }))(elem.value)),
      borderColor: elem.color,
      fill: false,
    }
  })
    .sort(function (a, b) {
      if (a.data[indexno] > b.data[indexno]) return 1;
      if (a.data[indexno] < b.data[indexno]) return -1;
      return 0;
    })
    .splice(-5, 5)

  return arr
}

class Lines extends React.Component {
  state = {
    chart: null,
    pos: 2017
  }

  componentWillReceiveProps(newProps) {
    if (newProps.data.length !== 0) {
      this.getChart(newProps)
    }
  }

  getChart = (props) => {
    let ctx = document.getElementById('lineChart').getContext('2d');
    if (this.state.chart) this.state.chart.destroy()
    let chart = new Chart(ctx, {
      type: 'line',
      data: {
        labels: [2015, 2016, 2017, 2018, 2019],
        datasets: makeDataset(props.data, this.props.year).filter(a => !!a),
      },
      options: {
        scales: {
          xAxes: [{
            id: 'x-axis-0',
            ticks: {
              max: 2019,
              min: 2015,
              stepSize: 1
            }
          },
          {
            id: 'x-for-line',
            ticks: {
              max: 2019,
              min: 2015
            },
            type: 'linear',
            display: false,
          }
        ]
        },
        maintainAspectRatio: false,
        annotation: {
          drawTime: 'afterDraw',
          events: ['click'],
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
              this.setState({pos: e.subject.config.value})
            },
            onDragEnd: (e) => {
              this.props.onHandleYearChange(Math.round(e.subject.config.value))
              this.setState({pos: Math.round(e.subject.config.value)})
            }
          }]
        }
      },
      tooltips: {
        mode: 'index',
      }
    })
    this.setState({ chart: chart })
  }

  updateLine = () => {
    this.state.chart.update()
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