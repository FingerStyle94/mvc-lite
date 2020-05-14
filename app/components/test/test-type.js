(function (global) {

    global.App.Controller('test-type', './components/test/', function ($scope, _update) {
        var customVar = 'Dite e bukur';

        $scope.getInput('inputEmpty');
        $scope.getInput('inputBoolean');
        $scope.getInput('inputNumber');
        $scope.getInput('inputString');
        console.log('test-type:primitiveInputted', $scope.inputEmpty, $scope.inputBoolean, $scope.inputNumber, $scope.inputString);
        $scope.getInput('inputObject');
        $scope.getInput('inputArray');
        $scope.getInput('inputFunction');
        $scope.getInput('inputDate');
        console.log('test-type:complexInputted', $scope.inputObject, $scope.inputArray, $scope.inputFunction, $scope.inputDate);
        $scope.definedEmpty = '';
        $scope.definedBoolean = true;
        $scope.definedNumber = 3;
        $scope.definedString = 'Prifti';
        console.log('test-type:primitiveDefined', $scope.definedBoolean, $scope.definedNumber, $scope.definedString);
        $scope.definedObject = {
            empty: $scope.definedEmpty,
            boolean: $scope.inputObject.boolean,
            number: $scope.inputArray[2],
            string: $scope.definedString
        };
        $scope.definedArray = [
            $scope.definedEmpty, $scope.inputObject.boolean, $scope.definedNumber, $scope.definedString
        ];
        $scope.definedFunction = function () {
            return $scope.inputFunction('test-type');
        };
        $scope.definedDate = new Date();
        console.log('test-type:complexDefined', $scope.definedObject, $scope.definedArray, $scope.definedFunction, $scope.definedDate);

        $scope.eventClicked = function () {
            processingResults();
            console.log('eventClicked', $scope.resultNumber, String, customVar, $scope);
            _update();
        };

        /**
         Ne kete seksion kemi integrimin e nje funksioni brenda nje funksioni tjeter i cili do procesoje te gjitha rezultatet e llojeve te tipeve qe kemi deklaruar me siper.
         */
        function processingResults() {
            $scope.resultEmptyAddOperator = $scope.inputEmpty + $scope.definedEmpty;
            $scope.resultNumberAddOperator = $scope.inputNumber + $scope.definedNumber;
            $scope.resultAndBoolean = $scope.inputBoolean && $scope.definedBoolean;
            $scope.resultStringAddOperator = $scope.inputString + $scope.definedString;
            $scope.resultArrayOfArray = $scope.inputArray.concat($scope.definedArray);
            $scope.resultArrayOfObject = [$scope.inputObject, $scope.definedObject];
            $scope.resultCallFunction = $scope.inputFunction($scope.definedFunction);
            $scope.resultArrayOfDate = [$scope.inputDate, $scope.definedDate];

            /**
             * Prova te tjera ne lidhje me menyren se si mund te na therriten rezultatet qe ne duam
             */
            $scope.resultArrayOfArray = [$scope.resultArrayOfArray, $scope.resultArrayOfObject];
            $scope.resultStringOfBoolean = customVar + $scope.inputBoolean;
            $scope.resultNumberSubOperator = $scope.inputNumber - $scope.definedNumber;
            console.log('test-type:processingResults', $scope.resultEmptyAddOperator, $scope.resultNumberAddOperator);
            console.log($scope.resultAndBoolean, $scope.resultStringAddOperator, $scope.resultArrayOfArray);
            console.log($scope.resultArrayOfObject, $scope.resultCallFunction, $scope.resultArrayOfDate,);
            console.log($scope.resultArrayOfArray, $scope.resultStringOfBoolean, customVar, $scope.resultNumberSubOperator);
        }

        //debugger;

    });

})(Function('return this')());