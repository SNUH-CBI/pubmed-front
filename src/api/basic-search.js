// api/basic-search.js
export default async function basicSearch(search_str) {
  const url =  "http://210.117.211.208:41002/basic-search?string=" + search_str

  let res = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(response) {
    return response.json();
  })

  return res;
}
