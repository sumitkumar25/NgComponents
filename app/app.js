'use strict';

// Declare app level module which depends on views, and components
angular.module('myApp', [
    'ngRoute',
    'filterDemo',
    'myApp.view2',
    'myApp.version'
]).config(['$locationProvider', '$routeProvider', function ($locationProvider, $routeProvider) {
        $locationProvider.hashPrefix('!');

        /*   $routeProvider.otherwise({redirectTo: '/view1'});*/
    }])
    .factory('dataService', ['$http', function ($http) {
        var getAirportData = function () {
            return $http.get("data/airports.json");
        }
        return {
            getAirportData: getAirportData
        }
    }]);
