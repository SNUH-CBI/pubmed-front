import { useState } from 'react';

// API
import yearSearch from "../api/year-search"
import keywordSearch from "../api/keyword-search"
import mapSearch from "../api/map-search"

export function useResult(){
  const [year, setYear] = useState([]);
  const [keyword, setKeyword] = useState([]);
  const [map, setMap] = useState({});

  function initialize(value){
    yearSearch(value).then((response) => {
      setYear(response.result.body.aggregations.group_by_state.buckets.reverse());
    });
    keywordSearch(value).then((response) => {
      setKeyword(response);
    });
    mapSearch(value).then((response) => {
      const mapped = response.result.map(item => ({ [item.abbr]: item.count }))
      setMap(Object.assign({}, ...mapped));
    });
  }

  return {
    result: { year, keyword, map },
    initialize
  }
}