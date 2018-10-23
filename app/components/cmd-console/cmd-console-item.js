(function (global) {

    global.App.Controller('cmd-console-item', './components/cmd-console/', function ($scope, _update) {
        $scope.getInput('item');
        console.log($scope.item);
        /** Getting the input items from the source*/
    });
})(Function('return this')());