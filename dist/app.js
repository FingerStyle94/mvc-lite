(function(global) {

    global.App.Controller('app', './', function($scope, _update) {
        $scope.title = "App works!";

        setTimeout(function() {
            $scope.title = "Hello World!";
            _update();
        }, 3000)
    });

})(Function('return this')());
(function(global) {

    var appRoutes = [
        { path: '', redirect: 'home' },
        { path: 'home', controller: 'main-layout' }
    ];

    new global.App.Router(appRoutes);

})(Function('return this')());
(function(global) {

    global.App.Controller('main-layout', '/main-layout/', function($scope, _update) {
        $scope.title = "Main Layout";

        $scope.buttonClicked = function(pageName) {
            global.App.Router().navigateTo(pageName);
        };
    });

})(Function('return this')());
(function(global) {

    global.App.Pipe('split', function(value, data) {
        return value.split(data);
    });

})(Function('return this')());