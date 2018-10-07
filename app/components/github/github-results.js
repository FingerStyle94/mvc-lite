(function (global) {

    global.App.Controller('github-results', './components/github/', function ($scope, _update) {
        $scope.getInput('data');
        console.log($scope.data);
    });

})(Function('return this')());
