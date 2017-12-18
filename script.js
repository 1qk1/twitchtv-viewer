$(document).ready(function(){
	var streams = ["monstercat", "ESL_SC2", "OgamingSC2", "cretetion", "freecodecamp", "storbeck", "habathcx", "RobotCaleb", "noobs2ninjas"];
	streams.map(function(curStream){
		$.getJSON("https://wind-bow.gomix.me/twitch-api/streams/" + curStream + "?callback=?", function(data){
			var status = data.stream;
			if (status == null){
				$.getJSON("https://wind-bow.gomix.me/twitch-api/channels/" + curStream + "?callback=?", function(data2){
					status = "offline";
					var logo = data2.logo;
					makeDOM(curStream, status, logo);
				});
			} else {
				makeDOM(curStream, data.stream.channel.status, data.stream.channel.logo);
			}
			function makeDOM(name, status, logo){
				$("#streamlist").append("<li><div class='row'><a target='_blank' href='https://twitch.tv/" + curStream + "'><div class='col-md-2'><img src='" + logo + "'></div>" +
						"<div class='col'><h4>" + name + "</h4>" +
						"<h5>" + status + "<h5></a></div></div></li>"
						);
				if (status != "offline") status = "online"; 
				$("li").last().addClass(status);
			}
		});

	});

	$("#offlinebutton").on("click", function(){
		$(".online").fadeOut();
		$(".offline").fadeIn();
	});
		$("#onlinebutton").on("click", function(){
		$(".offline").fadeOut();
		$(".online").fadeIn();
	});
		$("#allbutton").on("click", function(){
		$(".online").fadeIn();
		$(".offline").fadeIn();
	});
		
});