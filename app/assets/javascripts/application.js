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
var ready = function(){

  var video = $('video')[0];
  var canvas = $('canvas')[0];
  // var img = document.querySelector('img');
  console.log("Test");
  var submit = $('.submit')[0];
  var ctx = canvas.getContext('2d');
  var localMediaStream = null;
  var paused = false;
  var audio = $('audio')[0];
  $('video').bind('click', snapshot);
  submit.addEventListener('click',sendImage,false);

  navigator.getUserMedia  = navigator.getUserMedia ||
  navigator.webkitGetUserMedia ||
  navigator.mozGetUserMedia ||
  navigator.msGetUserMedia;

  navigator.getUserMedia({video: true}, function(stream) {
    video.src = window.URL.createObjectURL(stream);
    sizeCanvas();
    localMediaStream = stream;
  }, function(){});





  function snapshot() {

    if(!paused){
     video.pause();
     audio.play();
     $('video').animate({
      opacity: .2
    },75,function(){$('video').animate({opacity:1},75)})

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
function sendImage(e){
  e.preventDefault();
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
      processData: false,
    })
    .done(function(){
      window.location.href = submit.href;
    })
    .fail(function(jq){
      alert("o you failed"+jq.status);
    });
  },'image/png');
}

function sizeCanvas(){
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;
    // img.height = video.videoHeight;
    // img.width = video.videoWidth;
  }, 100);
}

// Not showing vendor prefixes or code that works cross-browser.

}

$(document).ready(ready);
$(document).on('page:load', ready);
/*
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
}*/