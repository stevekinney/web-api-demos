/* globals SimpleWebRTC */

var webrtc = new SimpleWebRTC({
  localVideoEl: 'local-video',
  remoteVideosEl: 'remote-videos',
  autoRequestMedia: true
});

webrtc.on('readyToCall', function () {
  webrtc.joinRoom('full-stack');
});
