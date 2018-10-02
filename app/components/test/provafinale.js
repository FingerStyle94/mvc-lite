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
        };

        $scope.getNumberElements = function () {
            var results = $scope.definedArray.filter(Number);
            for (var i in $scope.inputObject) {
                if (typeof $scope.inputObject[i] === 'number') {
                    results.push($scope.inputObject[i]);
                }
            }
            var sum = 0;
            for (var i = 0; i < results.length; i++) {
                sum += results[i]
            }
            console.log('getNumberElements', results, sum);
            return results.reduce(function (accumulator, currentValue) {
                return accumulator + currentValue;
            }, 0);
        };

        var printAll = function (compex) {
            console.log('printAll:', compex,);
            for (var i in compex) {
                console.log("printAll[" + i + "]: ", compex[i]);
            }
        };

        function printAllSecondary(compex) {
            console.log('printAll:printAllSecondary:');
            printAll(compex);
        }


        function printScope() {
            printAllSecondary($scope);
        }

        console.log(printAll($scope.definedArray), printAllSecondary($scope.inputObject), printScope());

    });
})(Function('return this')());