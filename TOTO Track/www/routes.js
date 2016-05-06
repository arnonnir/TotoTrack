app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'homePage/homePage.html',
        controller: 'homePageCtrl'
    })
}]);