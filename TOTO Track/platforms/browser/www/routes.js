app.config(['$routeProvider', function($routeProvider) {
    $routeProvider.
    when('/', {
        templateUrl: 'pages/login/login.html',
        controller: 'loginCtrl'
    })
        .when('/homePage', {
            templateUrl: 'pages/homePage/homePage.html',
            controller: 'homePageCtrl'
        })
}]);