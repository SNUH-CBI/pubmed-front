// api/keyword-search.js
export default async function mapSearch(search_str) {
  const url =  "http://210.117.211.208:41002/country?text=" + search_str;

  let res = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(response) {
    return response.json();
  })

  return res;
}
