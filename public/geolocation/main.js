(function(){
  'use strict';

  var latitudeElement = document.querySelector('.latitude');
  var longitudeElement = document.querySelector('.longitude');
  var mapLink = document.querySelector('.google-maps-link');

  var findMeButton = document.querySelector('.get-location');
  var watchMeButton = document.querySelector('.watch-location');
  var stopWatchingMeButton = document.querySelector('.stop-watching-location');

  findMeButton.addEventListener('click', function () {
    navigator.geolocation.getCurrentPosition(updateLocation);
  });

  var watchID;
  watchMeButton.addEventListener('click', function () {
    watchID = navigator.geolocation.watchPosition(updateLocation);
    watchMeButton.disabled = true;
    stopWatchingMeButton.disabled = false;
  });

  stopWatchingMeButton.addEventListener('click', function () {
    navigator.geolocation.clearWatch(watchID);
    watchMeButton.disabled = false;
    stopWatchingMeButton.disabled = true;
  });

  function updateLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    latitudeElement.textContent = lat;
    longitudeElement.textContent = long;

    mapLink.href = `https://www.google.com/maps/preview/@${lat},${long},20z`;
    mapLink.parentElement.classList.remove('hidden');
  }

}());
