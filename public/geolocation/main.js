(function(){
  'use strict';

  var latitudeElement = document.querySelector('.latitude');
  var longitudeElement = document.querySelector('.longitude');
  var mapLink = document.querySelector('.google-maps-link');

  var findMeButton = document.querySelector('.get-location');
  var watchMeButton = document.querySelector('.watch-location');

  findMeButton.onclick = function(){
    navigator.geolocation.getCurrentPosition(updateLocation);
  };

  watchMeButton.onclick = function(){
    var watchID = navigator.geolocation.watchPosition(updateLocation);
    addButtonToStopWatchingLocation(watchID);
  };

  function updateLocation(position) {
    var lat = position.coords.latitude;
    var long = position.coords.longitude;

    latitudeElement.textContent = lat;
    longitudeElement.textContent = long;

    mapLink.href = `https://www.google.com/maps/preview/@${lat},${long},20z`;
    mapLink.parentElement.classList.remove('hidden');
  }

  function addButtonToStopWatchingLocation(watchID) {
    var stopWatchingButton = document.createElement('button');
    stopWatchingButton.className = 'stop-watching';
    stopWatchingButton.textContent = 'Stop Watching';
    stopWatchingButton.onclick = function(){
      navigator.geolocation.clearWatch(watchID);
      this.remove();
    };
    watchMeButton.parentElement.appendChild(stopWatchingButton);
  }

}());
