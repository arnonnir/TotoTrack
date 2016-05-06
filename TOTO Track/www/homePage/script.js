app.factory('appSrv', ['$http', function ($http) {
    var service = {};

    service.sendParsedResult = function (data) {
        return $http.get("http://52.17.193.160:8080/hackatonSever/jsonocr", {params: {json: data}});
    }

    return service;
}]);

app.controller('homePageCtrl', ['$scope','$http','appSrv', function($scope, $http, appSrv) {
    var model = {};
    var jcrop_api;

    $scope.getFile = function (files) {
        debugger;
        var currentFile = files[0];
        model.fd = new FormData();
        model.fd.append("image", currentFile);
        model.fd.append("language", "iw");
        model.fd.append("apikey", "5RKRqZwDDr");

        var reader = new FileReader();
        reader.onload = function (event) {
            debugger;
            model.totoFormImg = event.target.result;
            $scope.$apply();

            $('#target').Jcrop({
                edge: [ 40,40,40,40 ],
                setSelect: [ 20,20,200,200 ],
                bgColor: 'blue'}
            , function() {
                    jcrop_api = this;
                    init_interface();
            });
        }

        reader.readAsDataURL(currentFile);
    };

    $scope.uploadFile = function() {
        $http.post("http://api.ocrapiservice.com/1.0/rest/ocr", model.fd, { headers: { 'Content-Type': undefined }, transformRequest: angular.identity }).then(function(response) {
            var totoResults = response.data;
            var arr = totoResults.split('\n');

            var result = [];
            angular.forEach(arr, function(totoColumn) {
                if(totoColumn != '') {
                    var totoColumnArr = totoColumn.split('');
                    result.push(totoColumnArr);
                }
            })

            var resultInJson = angular.toJson(result);

            appSrv.sendParsedResult(resultInJson).then(function(response) {
                debugger;
            });
        })
    };

    $scope.stam = function(){
        debugger;
        model.crop = jcrop_api.getSelection();
    }


    $scope.model = model;

}])
