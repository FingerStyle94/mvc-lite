(function (global) {
    /** On that part we take the input that was taken by the first component user-info */
    global.App.Controller('user-info-results', './components/user-info/', function ($scope, _update) {
        $scope.getInput('userInfo');
        console.log($scope.userInfo);
    });

})(Function('return this')());
