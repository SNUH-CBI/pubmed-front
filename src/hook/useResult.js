import { useState } from 'react';

// API
import yearSearch from "../api/year-search"

const components = ['barchart', 'keyword', 'map', 'author', 'journal'];

export function useResult(){
  const [result, setResult] = useState({
    year: []
  });

  function initialize(value){
    yearSearch(value).then((response) => {
      setResult({...result, year: response.result.body.aggregations.group_by_state.buckets.reverse()})
    })
  }

  return { result, initialize }
}