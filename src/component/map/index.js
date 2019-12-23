import React from 'react'
import { VectorMap } from "react-jvectormap"

export default class MapComponent extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      data: [],
    }
    this.mapStyle = {height: 500, margin: "0px 120px 40px 120px"}
    this.mapSeries = {
      regions: [{
        values: this.props.data,
        scale: ['#C8EEFF', '#0071A4'],
        normalizeFunction: 'polynomial'
      }]
    }
  }

  componentWillReceiveProps(newProps){
    this.mapSeries.regions[0].values = newProps.data
  }

  render() {
    return (
      <div className="Map">
        <h3 className="text-left ml-3">Map</h3>
        <div className="vector-map" style={this.mapStyle}>
          <VectorMap
            map={'world_mill'} backgroundColor="#D4D4D4" ref="map"
            containerStyle={{ width: '100%', height: '100%' }}
            containerClassName="map"
            series={this.mapSeries}
            onRegionTipShow={(e, el, code) => {
              el.html(el.html()+' Number : ' + this.props.data[code])
            }}
          />
        </div>
      </div>
    )
  }

}