import { useState } from 'react';

// API
import basicSearch from "../api/basic-search"

const components = ['barchart', 'keyword', 'map', 'author', 'journal'];

export function useResult(){
  const [result, setResult] = useState({
    
  }

  );

  function initialize(value){
    setResult({'barchart': basicSearch(value)})
  }

  return {
    result,
    initialize,
  }
}