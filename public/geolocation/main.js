(function(){
  'use strict';

  var $latitudeElement = $('.latitude');
  var $longitudeElement = $('.longitude');
  var $mapLink = $('.google-maps-link');

  var $findMeButton = $('.get-location');
  var $watchMeButton = $('.watch-location');
  var $stopWatchingMeButton = $('.stop-watching-location');

  $findMeButton.on('click', function () {
    navigator.geolocation.getCurrentPosition(updateLocation);
  });

  var watchID;
  $watchMeButton.on('click', function () {
    watchID = navigator.geolocation.watchPosition(updateLocation);
    $watchMeButton.attr('disabled', true);
    $stopWatchingMeButton.attr('disabled', false);
  });

  $stopWatchingMeButton.on('click', function () {
    navigator.geolocation.clearWatch(watchID);
    $watchMeButton.attr('disabled', false);
    $stopWatchingMeButton.attr('disabled', true);
  });

  function updateLocation(position) {
    var lat = position.coords.latitude;
    var lng = position.coords.longitude;

    $latitudeElement.text(lat);
    $longitudeElement.text(lng);

    var googleMapUrl = `https://www.google.com/maps/preview/@${lat},${lng},20z`;

    $mapLink.attr('href', googleMapUrl).parent().show();
  }

}());
