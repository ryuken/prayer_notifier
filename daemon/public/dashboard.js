var app = angular.module('app', ["ngRoute"]);

app.config(function($routeProvider)
{
    $routeProvider.when('/home',
    {
        templateUrl: '/dashboard.html',
        controller: function($scope, $http, $interval)
        {
            $http.get("/today").success(function(resp)
            {
                $scope.today = resp;

                $interval(checkNext, 100);
            });

            $http.get("/config").success(function(resp)
            {
                for(var i in $scope.prayers)
                {
                    if(-1 == resp.Enabled.indexOf($scope.prayers[i].name))
                    {
                        $scope.prayers[i].active = false;
                    }
                    else
                    {
                        $scope.prayers[i].active = true;
                    }
                }
            });

            $scope.prayers = [
                { name: "Fajr", isNext : false },
                { name: "Sunrise", isNext : false },
                { name: "Dhuhr", isNext : false },
                { name: "Asr", isNext : false },
                { name: "Maghrib", isNext : false },
                { name: "Isha", isNext : false }
            ];

            $scope.toggle = function(prayer)
            {
                prayer.active = !prayer.active;

                var enabled = [];

                for(var i in $scope.prayers)
                {
                    var prayer = $scope.prayers[i];

                    if(true == prayer.active)
                    {
                        enabled.push(prayer.name);
                    }
                }

                $http.post("/config/update", {
                    enabled : enabled
                }).success(function(resp)
                {
                    console.log(resp)
                });
            };

            var today = moment();

            function checkNext()
            {
                var now = moment();

                var fajr = moment($scope.today.Fajr, "HH:mm");
                var sunrise = moment($scope.today.Sunrise, "HH:mm");
                var dhuhr = moment($scope.today.Dhuhr, "HH:mm");
                var asr = moment($scope.today.Asr, "HH:mm");
                var maghrib = moment($scope.today.Maghrib, "HH:mm");
                var isha = moment($scope.today.Isha, "HH:mm");

                if(fajr.isAfter(now))
                    display("Fajr", fajr);
                else if(sunrise.isAfter(now))
                    display("Sunrise", sunrise);
                else if(dhuhr.isAfter(now))
                    display("Dhuhr", dhuhr);
                else if(asr.isAfter(now))
                    display("Asr", asr);
                else if(maghrib.isAfter(now))
                    display("Maghrib", maghrib);
                else if(isha.isAfter(now))
                    display("Isha", isha);
            }

            function display(prayer)
            {
                for(var item in $scope.prayers)
                {
                    item = $scope.prayers[item];

                    if(item.name == prayer)
                    {
                        item.isNext = true;
                    }
                    else
                    {
                        item.isNext = false;
                    }
                }
            }
        }
    })
    .otherwise(
    {
        redirectTo: '/home'
    });
});
