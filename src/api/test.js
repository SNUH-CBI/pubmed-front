// api/test.js
export default async function testES() {
  const url =  "http://localhost:4000/api/test"

  let res = await fetch(url, {
    method: 'GET',
    headers: {'Content-Type': 'application/json'},
  })
  .then(function(response) {
    return response.json();
  })

  return res;
}