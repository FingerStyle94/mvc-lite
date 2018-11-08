(function (global) {

    global.App.Controller('client-info', './components/client-info/', function ($scope, _update) {
        var TestModel = global.App.getModel('TestModel');
        $scope.clientData = false;

        TestModel.getClientInfo(function (clientData) {
            $scope.clientData = clientData;
            _update();
        });

        function handleCallback(clientData) {
            console.log(clientData);
        }


        console.log('client-info', TestModel.getClientInfo(handleCallback), TestModel.prova());
    });
})(Function('return this')());
