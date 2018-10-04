(function (global) {

    global.App.Controller('app', './', function ($scope, _update) {
        $scope.title = "App works!";

        setTimeout(function () {
            $scope.title = "Hello World!";
            _update();
        }, 3000)
    });

})(Function('return this')());
(function (global) {

    var appRoutes = [
        {path: '', redirect: 'home'},
        {path: 'home', controller: 'main-layout'}
    ];

    new global.App.Router(appRoutes);

})(Function('return this')());
(function (global) {

    global.App.Controller('main-layout', '/main-layout/', function ($scope, _update) {
        $scope.title = "Main Layout";

        $scope.buttonClicked = function (pageName) {
            global.App.Router().navigateTo(pageName);
        };
    });

})(Function('return this')());
(function (global) {

    global.App.Model('GitHub', function (setData) {
        var Api = "https://api.github.com/search/";
        this.entities = ['repositories', 'users'];

        /**
         * This function is used to get Data from GitHub
         * @param path string This parameter is used to switch between entities, Eg: 'repositories', 'users'...
         * @param params object This parameter is used to send params through query string, Eg: {q: 'rexhinaIdobet'}
         * @param callback function This parameter is used to handle the response
         */
        this.getGitHubData = function (path, params, callback) {
            console.log(path, params, callback);
            global.Utils.Http.get(Api + path, {params: params}, function (response) {
                callback(response);
                setData(response);
            });
        };

    });

})(Function('return this')());

(function (global) {

    global.App.Model('TestModel', function (setData) {

        this.getClientInfo = function (callback) {
            console.log(callback);
            global.Utils.Http.get('https://ip.nf/me.json', {}, function (response) {
                console.log('TestModel:getClientInfo', response);
                callback(response.ip);
                setData(response.ip);
            });
        };

        this.prova = gciTest;

        function gciTest() {
            console.log('TestModel:gciTest');
            return 'rehims';
        }


    });

})(Function('return this')());

(function (global) {

    global.App.Pipe('split', function (value, data) {
        return value.split(data);
    });

})(Function('return this')());
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

(function (global) {

    global.App.Controller('github-results', './components/github/', function ($scope, _update) {

    });

})(Function('return this')());

(function (global) {

    global.App.Controller('github', './components/github/', function ($scope, _update) {
        var GitHub = global.App.getModel('GitHub');
        $scope.entities = GitHub.entities;
        $scope.gitHubData = false;
        $scope.entity = false;
        $scope.term = false;
        $scope.message = '';

        $scope.eventClicked = function () {
            if ($scope.entity && $scope.term) {
                GitHub.getGitHubData($scope.entity, {q: $scope.term, page: 3}, function (gitHubData) {
                    $scope.gitHubData = processResults(gitHubData);
                    _update();
                });
            } else if (!$scope.entity) {
                $scope.message = 'Please choose a entity';
            } else if (!$scope.term) {
                $scope.message = 'Please type a term to search';
            } else {
                $scope.message = 'Please choose types before click';
            }
            _update();
        };

        $scope.inputFocusout = function () {
            console.log('github:inputFocusout', this.value);
            $scope.term = this.value;
            _update();
        };

        $scope.selectClicked = function (entity) {
            console.log('github:selectClicked', entity);
            $scope.entity = entity;
            _update();
        };

        function processResults(results) {
            console.log('github:processResults', results);
            $scope.gitHubData = results;
        }
    });
})(Function('return this')());

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
(function (global) {

    global.App.Controller('test-type-input', './components/test/', function ($scope, _update) {
        $scope.inputValueEmpty = null;
        $scope.inputValueBoolean = true;
        $scope.inputValueNumber = 9;
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