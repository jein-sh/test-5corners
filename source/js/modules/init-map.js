const address = document.getElementById('address');
const searchBtn = document.getElementById('search');
let searchData;

const urlAddress = 'https://cleaner.dadata.ru/api/v1/clean/address';
const urlSuggestions = 'http://suggestions.dadata.ru/suggestions/api/4_1/rs/geolocate/address';
const token = '737185198c92ad17e79e8ae65f3ab0d1a68d598d';
const secret = '49d9b496910a96d5bb0d07f0e273195db8532b47';


const getAddress = (query) => {
  fetch(urlAddress, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': 'Token ' + token,
      'X-Secret': secret,
    },
    body: JSON.stringify([query]),
  })
      .then((res) => res.json())
      .then((data) => {
        searchData = data[0];
        console.log(data);
      });
};

const getCoords = (query) => {
  fetch(urlSuggestions, {
    method: 'POST',
    mode: 'cors',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json',
      'Authorization': 'Token ' + token,
    },
    body: JSON.stringify(query),
  })
      .then((res) => res.json())
      .then((data) => {
        address.value = data.suggestions[0].value;
      });
};

/* eslint-disable no-undef */
const initMap = () => {
  const mapEl = document.querySelector('#map');

  if (typeof ymaps !== 'undefined' && mapEl) {
    ymaps.ready(function () {
      const myMap = new ymaps.Map(map, {
        center: [55.76, 37.64],
        zoom: 15,
        controls: [],
      });

      const myPlacemark = new ymaps.Placemark([55.76, 37.64], null, {
        iconLayout: 'default#image',
        iconImageHref: './img/svg/pin.svg',
        iconImageSize: [28, 40],
        iconImageOffset: [-14, -40],
      });

      myMap.geoObjects.add(myPlacemark);

      myMap.events.add('click', (e) => {
        myPlacemark.geometry.setCoordinates(e.get('coords'));
        myMap.geoObjects.add(myPlacemark);
        getCoords({lat: e.get('coords')[0], lon: e.get('coords')[1]});
      });

      searchBtn.addEventListener('click', (e) => {
        e.preventDefault();
        getAddress(address.value);

        address.value = searchData.result;

        myPlacemark.geometry.setCoordinates({lat: searchData.geo_lat, lon: searchData.geo_lon});
        myMap.geoObjects.add(myPlacemark);
      });
    });
  }
};

export {initMap};
