import * as d3 from 'd3'

export function createNodes(rawData) {
  const maxAmount = d3.max(rawData.map((v) => {
    return d3.max(Object.values({...v, ...{"key": 0}}))
  }))

  const radiusScale = d3.scalePow()
      .exponent(0.5)
      .range([0, 100])
      .domain([0, maxAmount])

  const myNodes = rawData.map((d, index) => {
    let exceptKey = {...d};
    delete exceptKey.key
    Object.entries(exceptKey).map( v => exceptKey[v[0]] = radiusScale(+v[1]))
    return {
      id: index,
      radius: exceptKey,
      value: {...d},
      name: d.key,
      x: Math.random() * 900,
      y: Math.random() * 800,
    }
  })

  myNodes.sort((a, b) => b.value - a.value)

  return myNodes
}

export const fillColor = () => ("#"+((1<<24)*Math.random()|0).toString(16))
