// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/sstephenson/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require turbolinks
//= require_tree .


$(function(){
  var video = document.querySelector('video');
  var canvas = document.querySelector('canvas');
  // var img = document.querySelector('img');
  var submit = document.querySelector('.submit');
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;
  var paused = false;

  function snapshot() {
    if(!paused){
     video.pause();
     if (localMediaStream) {
      ctx.drawImage(video, 0, 0);
      // "image/webp" works in Chrome.
      // Other browsers will fall back to image/png.
      // document.querySelector('img').src = canvas.toDataURL('image/webp');
    }

  }else{
    video.play();
  }
  paused = !paused;
}
function sendImage(){
  canvas.toBlob(function(b){
    data = new FormData();
    data.append('post[image]',b,'image');
    data.append('post[content]',$('#post_content')[0].value);
    $.ajax({
      url: $('form').attr('action'),
      contentType: false,
      type: 'POST',
      dataType: 'json',
      data: data,
      processData: false
    });
  },'image/png');
}

function sizeCanvas(){
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    img.height = video.videoHeight;
    img.width = video.videoWidth;
  }, 100);
}

video.addEventListener('click', snapshot, false);
submit.addEventListener('click',sendImage,false);

// Not showing vendor prefixes or code that works cross-browser.
navigator.webkitGetUserMedia({video: true}, function(stream) {
  video.src = window.URL.createObjectURL(stream);
  sizeCanvas();
  localMediaStream = stream;
}, function(){});

});
function doRekog(imgdata) {
  console.log("doRekog");

  // Init data
  var formData = new FormData(document.forms[0]);
  formData.append("uploaded_file",imgdata);
  formData.append("api_key", '3LE8QixSwo0eHyCI');
  formData.append("api_secret", 'aPQtDeGB7aPsPsyu');
  formData.append("jobs", "scene");

  // Show status
  $("#statusText").html("Sending picture to rekognition.com...");

  // Init and send request
  $.ajax({
    url: 'http://rekognition.com/func/api/',
    data: formData,
    cache: false,
    contentType: false,
    processData: false,
    dataType:"json",
    type: 'POST',
    success: function (data) {

      var result = "<h2>Results</h2>";

      if(data.scene_understanding) {

        var isFacePresent = false;

        for(var i=0, len=data.scene_understanding.length; i<len; i++) {
          var resultItem = data.scene_understanding[i];
          result += resultItem.label + " (Confidence: "+resultItem.score+")<br/>";
        }

        if (resultItem.score > 0.85) // face present
          document.forms[0].submit();
        else
          alert('Selfies or Roomies Only!!');
      }
      $("#statusText").html(result);
    }
  });
}