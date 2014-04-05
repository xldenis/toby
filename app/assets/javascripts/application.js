
//
//= require jquery


//= require canvastoblog.min
//= require ccv
//= require face
//= require jquery.facedetection
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
  $('form').bind('submit',sendImage);
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
      $('img')[0].src = canvas.toDataURL('image/webp');
    }

  }else{
    video.play();
  }
  paused = !paused;
}
function sendImage(e){
  e.preventDefault();
  var coords = $('img').first().faceDetection()[0];
  if(coords == null){
    console.log("test");
    alert('yur dummmmmmm');
    return;
  }
  console.log("untest");
  canvas.toBlob(function(b){
    data = new FormData();
    if ($('#post_image')[0].value != "") {
      data.append('post[image]',$('#post_image')[0].value);
    }else{
    data.append('post[image]',b,'image');
    }
    data.append('post[content]',$('#post_content')[0].value);
    $.ajax({
      url: $('form').attr('action'),
      contentType: false,
      type: 'POST',
      dataType: 'json',
      data: data,
      processData: false
    })
    .done(function(){
      var result = doRekog(b);
      
      window.location = submit.href;

    })
    .fail(function(jq){alert("o you failed"+jq.status);});
  },'image/png');
}

function sizeCanvas(){
  setTimeout(function() {
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight; 
  }, 100);
}

}
$(document).ready(ready);
$(document).on('page:load', ready);

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

