(function (global) {

    global.App.Controller('test-type-input', './components/test/', function ($scope, _update) {
        $scope.inputValueEmpty = null;
        $scope.inputValueBoolean = true;
        $scope.inputValueNumber = 6;
        $scope.inputValueString = 'rexhina';
        console.log('test-type-input:primitive', $scope.inputValueEmpty, $scope.inputValueBoolean, $scope.inputValueNumber, $scope.inputValueString);
        $scope.inputValueObject = {
            empty: null, boolean: false, number: 9, string: 'rexhina'
        };
        $scope.inputValueArray = [
            null, true, 9, 'rexhina'
        ];

        $scope.inputValueFunction = function (valueInputted) {
            valueInputted = valueInputted || 'test-type-input';
            var valueFunction = 'valueFunction';
            if (valueInputted === $scope.inputValueNumber) {
                $scope.inputValueBoolean = false;
            }
            console.log(valueInputted + ':inputValueFunction', valueFunction, $scope.inputValueNumber);
            return valueFunction + $scope.inputValueNumber;
        };
        $scope.inputValueDate = new Date(2017, 11, 5);
        console.log('test-type-input:complex', $scope.inputValueObject, $scope.inputValueArray, $scope.inputValueFunction, $scope.inputValueFunction(), $scope.inputValueDate);

        /** Helper Function */
        $scope.inputTypeOf = function (inputValue) {
            return typeof inputValue;
        };

        // Test area
        $scope.inputValueObjectFunction = function () {
            var result = Object.keys($scope.inputValueObject).map(function (key) {
                return $scope.inputValueObject[key];
            });
            console.log('test-type-input:inputValueObjectFunction', Object.keys($scope.inputValueObject), result);
            return result.filter(function (e) {
                return typeof e === 'number';
            });
        };
        $scope.inputValueArrayFunction = function () {
            var rez = Object.keys($scope.inputValueObject).map(function (key) {

                return [$scope.inputValueObject[key] + $scope.inputValueArray];
            });
            console.log('test-type-input:inputValueArrayFunction', $scope.inputValueArray, rez, Object.keys($scope.inputValueObject));

        };

        // End test area
    });

})(Function('return this')());