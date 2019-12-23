// api/keyword-search.js
export default async function keywordSearch(search_str) {
  const url =  "http://210.117.211.208:41002/keyword?text=" + search_str + "&impactFactor=0";

  let res = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(response) {
    return response.json();
  })

  return res;
}
