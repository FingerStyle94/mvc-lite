(function (global) {

    global.App.Controller('cmd-console-list', './components/cmd-console/', function ($scope, _update) {
        $scope.getInput('list');
        console.log('cmd-console-list',$scope.list);
    });
    /** Getting the input list  of the items in the source*/
})(Function('return this')());
