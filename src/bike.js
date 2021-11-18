/*2*/
export default class getBikes {
  static bikeInfo(zip) {
    return fetch(`https://bikeindex.org/api/v3/search?page=1&per_page=25&location=${zip}&distance=15&stolenness=proximity&client_id=${process.env.API_KEY}`) 

    .then(function(response) {
      if (!response.ok) {
        throw Error(response.statusText);
      }
      return response.json();
    })
    .catch(function(error) {
      return error;
    })
  }
}