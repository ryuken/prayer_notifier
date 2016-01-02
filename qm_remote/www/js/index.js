var app = angular.module("guide", ['ngRoute', 'ngWebsocket']);

app.config(function($routeProvider)
{
	$routeProvider
		.when('/',
		{
			controller : "HomeController",
			templateUrl : "templates/home.html"
		})
		.otherwise({redirectTo: '/'});
});

app.controller("HomeController", function($scope, $websocket)
{
    document.addEventListener('deviceready', onDeviceReady, false);
});

var found_url = null;

function onDeviceReady()
{
	networkinterface.getIPAddress(function (ip)
    {
		console.log("YOUR IP IS: " + ip);

		var split = ip.split(".");
		delete split[split.length - 1];
		var first = split.join(".");

		console.log("Searching on " + first + "xxx");

		sync_loop(1, 255, function (loop)
        {
			var i = loop.iteration();

			var url = "http://" + first + i + ":3000/qm";

			ping.ping(
				url,
				100,
				function (message) {
					if (0 == parseInt(message)) {
						console.log("Found nothing at " + url);
						loop.next();
					} else {
						found_url = url;
						loop.break();
					}
				},
				function (e) {
					alert("Error calling [Ping] plugin");
					console.log(e);
				}
			);
		});
	});
}