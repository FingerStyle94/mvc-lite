(function (global) {

    global.App.Controller('cmd-console-list', './components/cmd-console/', function ($scope, _update) {
        $scope.getInput('list');
        console.log($scope.list);
    });
})(Function('return this')());
