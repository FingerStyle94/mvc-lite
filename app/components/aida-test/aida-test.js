(function (global) {

    global.App.Controller('aida-test', './components/aida-test/', function ($scope, _update) {
        // declare all variables that I'm going to use
        var NumberModel = global.App.getModel('AidaTest');
        $scope.title = "Calculate Test";
        $scope.number1 = '';
        $scope.number2 = '';
        $scope.result = null;

        // get input value
        $scope.inputNumber = function () {
            switch (this.name) {
                case 'number1':
                    $scope.number1 = this.value;
                    break;
                case 'number2':
                    $scope.number2 = this.value;
                    break;
            }
            _update();
        };

        // calculate addition
        $scope.calAddition = function () {
            $scope.result = parseInt($scope.number1) + parseInt($scope.number2);
            _update();
        }

        // calculate subtraction
        $scope.calSubtraction = function () {
            $scope.result = parseInt($scope.number1) - parseInt($scope.number2);
            _update();
        }

        // calculate multiplication using model AidaTest
        $scope.calMultiplication = function () {
            $scope.result = NumberModel.getCalMultiplication($scope.number1, $scope.number2);
            _update();
        }

        // calculate Division usin model AidaTest
        $scope.calDivision = function () {
            $scope.result = NumberModel.getCalDivision($scope.number1, $scope.number2);
            _update();
        }

    });
})(Function('return this')());
