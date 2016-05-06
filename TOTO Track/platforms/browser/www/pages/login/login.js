app.factory('loginSrv', ["$http", function($http) {
    var service = {};

    service.login = function(cerdentials) {
        return $http.get(appConfig.webServerUrl + "/authentication", {params: {username: cerdentials.username, password: cerdentials.password}});
    }


    return service;
}])

app.controller('loginCtrl', ['$scope','loginSrv','$location', function($scope, loginSrv, $location) {
    var model = {};

    $scope.login = function(data) {
        debugger;
        loginSrv.login(data).then(function(response) {
            if(response.data == "success") {
                debugger;
                model.isSuccess = true;
                $location.path('/homePage')
            }else {
                model.isSuccess = false;
            }
        })
    }

    $scope.model = model;
}]);
