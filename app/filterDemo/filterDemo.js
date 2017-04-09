'use strict';

angular.module('filterDemo', ['ngRoute', 'ui.bootstrap'])

    .config(['$routeProvider', function ($routeProvider) {
        $routeProvider.when('/filterDemo', {
            templateUrl: 'filterDemo/filterDemo.html',
            controller: 'filterDemoCtrl as Ctrl'
        });
    }])

    .controller('filterDemoCtrl', ['dataService', '$scope', function (dataService, $scope) {
        $scope.alphabets = ["a", "b", "c", "d"];
        $scope.numbers = [10, 20, 30, 40];
        $scope.airportData = null;
        dataService.getAirportData().success(function (data) {
            $scope.airportData = data['airports'];
        });
        $scope.nf = [];
        $scope.af = [];
        $scope.CharacterFilterInc = function ($item, $model, $label, $event) {
            $scope.af.push($item);
        }
        $scope.NumberFilterInc = function ($item, $model, $label, $event) {
            $scope.nf.push($item);
        }
    }]).filter('CharacterFilter', function () {
    return function (items, filterObj) {
        if (items) {
            var fitems = items.filter(function (item) {
                if (filterObj && filterObj.length) {
                    for (var i = 0; i < filterObj.length; i++) {
                        if (item["airportCode"].toUpperCase().indexOf(filterObj[i].toUpperCase()) > -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
            items = fitems;
        }
        return items;
    }
}).filter('NumberFilter', function () {
    return function (items, filterObj) {
        if (items) {
            var fitems = items.filter(function (item) {
                if (filterObj && filterObj.length) {
                    for (var i = 0; i < filterObj.length; i++) {
                        if (item["longitude"].indexOf(filterObj[i]) > -1) {
                            return true;
                        }
                    }
                    return false;
                }
                else {
                    return true;
                }
            });
            items = fitems;
        }
        return items;
    }
});

