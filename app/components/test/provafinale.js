(function (global) {

    global.App.Controller('provafinale', './components/test/', function ($scope, _update) {
        $scope.getInput('provaBoolean');
        $scope.getInput('inputArray');
        $scope.getInput('definedObject');
        $scope.getInput('inputObject');
        $scope.getInput('definedArray');

        console.log('provafinale', $scope.provaBoolean, $scope.inputArray, $scope.definedObject);
        $scope.getFullName = function () {
            var result = '', counter = 0;
            for (var i in $scope.definedObject) {
                if (typeof $scope.inputArray[counter] === 'string') {
                    result += $scope.inputArray[counter] + ' ';
                }
                if (typeof $scope.definedObject[i] === 'string') {
                    result += $scope.definedObject[i];
                }
                counter++;
            }
            return result;
        };

        console.log('prova2', $scope.inputObject, $scope.definedArray);

        $scope.getStringElements = function () {
            var results = $scope.definedArray.filter(Boolean);
            for (var i in $scope.inputObject) {
                if ($scope.inputObject[i]) {
                    results.push($scope.inputObject[i]);
                }
            }
            console.log('getStringElements', results);
            return results.join(' ');
        }
    });

})(Function('return this')());