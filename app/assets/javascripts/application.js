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
 function emitStream() {
	// Asking permission to get the user media.
	// If permission granted, assign the stream to the HTML 5 video element.
	navigator.webkitGetUserMedia({video: true, audio: true}, function (stream) {
	that._video = document.querySelector('video');
	that._video.src = window.URL.createObjectURL(stream);
	});
}


 function takePicture() {
	// Assigning the video stream to the canvas to create a picture.
	that._canvas = document.querySelector('canvas');
	var context = that._canvas.getContext('2d');
	context.clearRect(0, 0, 0, 0);
	context.drawImage(that._video, 0, 0, 400, 300);

	doRekog(that._video);
}

function doRekog(imgdata) {
	console.log("doRekog");
	
	// Init data
	var formData = new FormData();
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