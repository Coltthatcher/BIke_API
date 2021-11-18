import $ from 'jquery';
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import getBikes from './bike';
import TimeConversions from './utilitiesfunction';

/*3*/
function getElements(response) {
  if (response.bikes) {
    const timePeriod = $("input:radio[name=time-stamp]:checked").val();
    const now = Date.now();
    const selectedTimePeriod = (now - timePeriod)/1000;
    let bikeArray = [];
      for (let i =0; i < response.bikes.length; i++) {
        if (response.bikes[i].date_stolen > selectedTimePeriod) {
          bikeArray.push(response.bikes[i].manufacturer_name);
          const time = new TimeConversions(response.bikes[i].date_stolen);
          const date = time.formatTime();
          let bikeDiv = `<div id=bike${i}><div id="showBikes${i}"></div><div id="showThumb${i}"></div></div>`
          
          $(".bikes").append(bikeDiv);
          $(`#showBikes${i}`).html(`${response.bikes[i].stolen_location} Stolen on ${date}`);
          if (response.bikes[i].thumb) {
            $(`#showThumb${i}`).html(`<img src='${response.bikes[i].thumb}'> `) 
          }else{
            $('.showThumb').html("");
          }
        }
      }
      let mostCommonBike = getMode(bikeArray);
    $(".bikes").prepend(`${mostCommonBike} was the most commonly stolen bike manufacturer.`);
  } else {
    $('.showErrors').text(`There was an error: ${response}`);
  }
}

/*1*/
async function makeAPiCall(zip) {
  const response = await getBikes.bikeInfo(zip)
  getElements(response)
}




$('#search').click(function(){
  const searchResults =$('#input').val();
  $('#input').val("");
  makeAPiCall(searchResults);
});


/*let promise = new Promise(function(resolve, reject) {
  let request= new XMLHttpRequest();
  const url = `http://bikeindex.org/api/v3/search?client_id=${process.env.API_KEY}`;
  request.onload = function() {
    if (this.status=== 200) {
      resolve(request.response).showResults();
    } else {
      reject(request.response);
    }
  }
request.open("GET", url ,true);
request.send();


}); */

function getMode(array) {
  const obj = {};
  array.forEach(bike => {
    if (!obj[bike]) {
      obj[bike] = 1;
    } else {
      obj[bike] += 1;
    }
  });
  let highestValue = 0;
  let highestValueKey = "";

  for (let key in obj) {
    const value = obj[key];
    if (value > highestValue) {
      highestValue = value;
      highestValueKey = key;
    }
  }
  return highestValueKey;
}