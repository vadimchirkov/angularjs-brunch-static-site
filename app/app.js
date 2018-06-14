import angular from 'angular';
import marked from 'marked';
import jsyaml from 'js-yaml';
import 'angular-sanitize';
import 'angular-ui-router';

var app = angular.module('app', [
    'ui.router', 'ngSanitize'
])
app.config(["$locationProvider", function($locationProvider) {
    $locationProvider.html5Mode(true).hashPrefix('!'); // remove url prefix
}]);
app.config(['$httpProvider', function($httpProvider) {
    $httpProvider.defaults.cache = true; // enable http caching
}]);

app.controller('indexCtrl', function($scope, $parse, $http, $rootScope) {

    $http({
        method: 'GET',
        url: 'content/pages.json'   // Get all file names in folder  
    }).then(function successCallback(response) {
        angular.forEach(response.data, function(value,key) {     
            $scope.sendPageData(value);  // Send each file name to sendPageData() function
        });
    }, function errorCallback(response) {
        console.log('error');
    });
    $scope.pages = [];

    $scope.sendPageData = function(file) {
        $http({            
            method: 'GET',   // Get all content of each file 
            url: 'content/' + file       
        }).then(function successCallback(response) {
            $scope.page = jsyaml.load(response.data); // Translate YAML content
            $scope.pageContent = marked($scope.page.content); // Translate Markdown field 
            $scope.pages.push({ url: file, title: $scope.page.title, content: $scope.pageContent }) // Push all the data to array 
        }, function errorCallback(response) {
            console.log('error');
        }); 
    }
});

/* Ui Router */
app.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/');
    return $stateProvider
        .state('main', {
            url: "/",
            templateUrl: 'templates/main.html',
            controller: 'indexCtrl'
        })
});