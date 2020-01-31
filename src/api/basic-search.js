// api/basic-search.js
async function basicSearch(search_str) {
  const url =  "http://210.117.211.208:41002/basic-search?string=" + search_str

  let res = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(response) {
    return response.json();
  })

  return res
}

export default function basicUpdate(value){
  basicSearch(value).then((response) => {
      console.log(response.result.body.aggregations.group_by_state.buckets.reverse());
      return response.result.body.aggregations.group_by_state.buckets.reverse();
  });
}