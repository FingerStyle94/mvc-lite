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

    global.App.Model('PersonModel', function (setData) {
        /** Creating  the PersonModel which will control the person component*/

        this.getPersonFullName = function (firstName, lastName) {
            return firstName + ' ' + lastName + ' ' + ' ';
        };
        this.getPersonAge = function (birthday) {
            var diff_ms = Date.now() - birthday.getTime();
            var age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        };
        this.getPersonProfession = function (profession) {
            return profession;
        };
        this.getPersonBMI = function (weight, height) {
            height *= 12;
            var BMI = (weight / (height * height)) * 703;
            return Math.round(BMI * Math.pow(10, 2)) / Math.pow(10, 2);
        };
        this.getBabyInfo = function (month) {
            var childWeight, childHeight;
            if (month === 'month1') {
                childWeight = '3.3 - 5kg';
                childHeight = '48-58 cm';
            } else if (month === 'month2') {
                childWeight = '4-6 kg';
                childHeight = '53-60 cm';
            }
            else if (month === 'month3') {
                childWeight = '4.5-7 kg';
                childHeight = '57-65 cm';
            }
            else if (month === 'month4') {
                childWeight = '5.5-8 kg';
                childHeight = '59-66 cm';
            }
            return childHeight + childWeight;
        };
    });

})(Function('return this')());

(function (global) {

    global.App.Model('TestModel', function (setData) {
        /** Creating  a function (this.testData) which will include some elements inside of an object */

        this.testData = function (level) {
            level = level || 0;
            level++;
            return level > 9 ? {} : {
                array: Object.keys(this.testData(level)).sort(),
                object: this.testData(level),
                boolean: Math.random() >= 0.5,
                string: Math.random().toString(36).substring(7),
                callback: function () {
                    return level;
                },
                integer: this.testData(level).hasOwnProperty('callback') ? this.testData(level).callback() + Math.random() : 0
            }
        };

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
            return 'rexhina';
        }


    });

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

    global.App.Pipe('split', function (value, data) {
        return value.split(data);
    });

})(Function('return this')());
(function (global) {

    global.App.Controller('cmd-console-item', './components/cmd-console/', function ($scope, _update) {
        $scope.getInput('item');
        console.log($scope.item);
        /** Getting the input items from the source*/
    });
})(Function('return this')());
(function (global) {

    global.App.Controller('cmd-console-list', './components/cmd-console/', function ($scope, _update) {
        $scope.getInput('list');
        console.log('cmd-console-list',$scope.list);
    });
    /** Getting the input list  of the items in the source*/
})(Function('return this')());

(function (global) {

    global.App.Controller('cmd-console', './components/cmd-console/', function ($scope, _update) {
            var TestModel = global.App.getModel('TestModel');
            $scope.source = TestModel.testData();
            $scope.result = null;
            $scope.validateCommand = false;

            console.log('cmd-console', $scope.source);

            /** Command processing is a function that will then include the command validation function which will validate commands that are either # or with: depending on the command */

            $scope.processCommand = function () {
                console.log('cmd-console:processCommand', this.name, this.type, this.value);
                var vc = validateCommand(this.value);
                processResult(vc.command, vc.value);
                _update();
            };

            /** Validating command will catch the command in two parts, separating in too variables the command and value*/

            function validateCommand(rawCommand) {
                var v = '', c = '', parts, sharpCommand = ['about', 'help', 'author'];
                if (rawCommand.indexOf(':') > 0) {
                    parts = rawCommand.split(':');
                    c = parts[0];
                    v = parts[1];
                } else if (rawCommand.indexOf('#') === 0) {
                    parts = rawCommand.split('#');
                    c = '#';
                    v = parts[1];
                }
                console.log('console-console:validateCommand', rawCommand, c, v);
                switch (c) {
                    case '#':
                        if (sharpCommand.indexOf(v) === -1) {
                            console.log('console-console:validateCommand [' + v + '] command does not exists in: ', sharpCommand);
                            $scope.validateCommand = 'This command does not exist';
                        }
                        break;
                    default:
                        if (['level'].indexOf(c) > -1) {
                            c = 'callback';
                        }
                        if ($scope.source.array.indexOf(c) === -1) {
                            console.log('console-console:validateCommand [' + c + ':' + v + '] command does not exists in: ', $scope.source.array);
                            $scope.validateCommand = 'Please put another command';
                        }
                }
                return {command: c, value: v};
            }


            /** Processing results will include two sub-functions of processing two types of commands. */

            function processResult(command, value) {
                if (!$scope.validateCommand) {
                    if (command === '#') {
                        $scope.result = processSharpCommand(value);
                    } else {
                        $scope.result = processColonCommand(command, value);
                    }
                    _update();
                    console.log('cmd-console:processResult', command, value, $scope.source, $scope.result);
                }
            }

            /** Processing the sharpCommand  of (# commands) */

            function processSharpCommand(command) {
                switch (command) {
                    case 'about':
                        return 'Description for about!';
                    case 'help':
                        return 'Do you need help ?';
                    case 'author':
                        return 'Rexhina Prifti';
                    default:
                        return 'This command does not exist!';
                }

            }

            /** Processing the colonCommand  of (: commands)*/
            function processColonCommand(command, value) {
                return processColon(command, value, $scope.source);
            }

            function processColon(key, value, source) {
                if (!source) return [];
                var result = [];

                if (checkRegExp(value) && new RegExp(value).test(source[key])) {
                    result.push(source);
                } else if (source[key] === castValue(key, value)) {
                    result.push(source);
                }
                return result.concat(processColon(key, value, source.object));
            }

            /** Processing the value with castValue parameter */
            function castValue(type, value) {
                switch (type) {
                    case 'boolean':
                        return value === 'false' ? false : true;
                    default:
                        return value;
                }
            }

            /** Creating a function for checking  if the value is a RegExp*/

            function checkRegExp(value) {
                var isValid = true;
                try {
                    new RegExp(value);
                } catch (e) {
                    console.error(e);
                    isValid = false;
                }
                return isValid;
            }
        }
    );

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
        $scope.getInput('data');
        console.log($scope.data);
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
        $scope.found = false;
        $scope.even = false;


        $scope.eventClicked = function () {
            if ($scope.entity && $scope.term) {
                GitHub.getGitHubData($scope.entity, {q: $scope.term}, function (gitHubData) {
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

        /**
         Ne kete seksion kemi  shfaqjen e te dhenave qe ne duam perkatesisht per entitetet users dhe repositories prandaj  do kontrollohen  me ane te nje indeksi [i] i cili do kape te dhenat qe duam nga results.
         */

        function processResults(results) {
            var data = [], k, sr, st, ok, up, str = 'rexhinaIdobet';
            console.log('github:processResults', results);
            for (var i in results.items) {
                if ($scope.entity === 'users') {
                    data.push({
                        id: results.items[i].id,
                        score: results.items[i].score,
                        login: results.items[i].login,
                        html_url: results.items[i].html_url
                    });


                } else if ($scope.entity === 'repositories') {
                    data.push({
                        score: results.items[i].score,
                        id: results.items[i].id,
                        name: results.items[i].name,
                        forks: results.items[i].forks
                    });
                }
                $scope.resultArrayOfObject = [$scope.entity, $scope.term];
                console.log($scope.resultArrayOfObject);
                /**
                 Ne kete seksion provojme funksionin parseInt te string
                 */
                parseInt = function () {
                    var I = 'rexhinaIdobet';
                    console.log(I.parseInt);
                };

                /**
                 Ne kete seksion provojme medoden  charCodeAt() e cila kthen unicode te karakterit ne nje index specifik
                 */
                k = str.charCodeAt(3);
                console.log(k);
                /**
                 Ne kete seksion provojme medoden split() e cila ndan stringun
                 */
                st = str.split("");
                console.log(st);
                /**
                 Ne kete seksion provojme medoden substr() e cila ndan stringun duke filuar nga filimi deri ne poz qe duam
                 */
                sr = str.substr(7);
                console.log(sr);
                /**
                 Ne kete seksion provojme medoden substring() e cila ndan stringun nga nje poz ne nje tjeter
                 */
                ok = str.substring(4, 7);
                console.log(ok);
                /**
                 Ne kete seksion provojme medoden  toUpperCase() e cila kthen stringun ne tip upercase
                 */
                up = str.toUpperCase();
                console.log(up);
                /**
                 Ne kete seksion provojme medoden   valueOf() e cila kthen vleren primitive te objektit string
                 */

                /**
                 Ne kete seksion provojme includes ne array
                 */
                console.log(data.includes('netmask'));

                /**
                 Ne kete seksion kemi shfaqjen e te dhenave per userin rexhinaIdobet
                 */

                $scope.found = data.find(function (element) {
                    return element.login === "rexhinaIdobet";
                });

                console.log($scope.found);
            }
            /**
             Ne kete seksion provojme sort ne array
             */
            data.sort(function (a, b) {
                return b.id - a.id;
            });
            console.log(data.length);
            /**
             Ne kete seksion provojme arrayfilter.
             */


            /**const result = data.filter(data => data.name === 'rexhinaIdobet');
             console.log(result);*/
            /**
             Ne kete seksion na shfaq tre te dhenat e para per cdo user..
             */

            console.log(data.slice(2));
            /**
             Ne kete seksion ......
             */
            $scope.even = function (element) {
                return element.score === 26.686699;
            };

            var extra = {}, group, info = [];
            for (var i in results.items) {
                if ($scope.entity === 'repositories') {
                    group = results.items[i].owner.login;
                    if (!extra[group]) {
                        extra[group] = [];
                    }
                    extra[group].push(results.items[i].name);
                }
                if (results.items[i].login === 'rexhinaIdobet') {
                    info.push({
                        score: results.items[i].score,
                        html_url: results.items[i].html_url
                    });
                }
            }
            console.log('results', extra, results.items, info);
            //data = results.items;
            return {

                extra: extra,
                data: data,
                type: $scope.entity,
                term: $scope.term,
                info: info,
                str: str,
                k: k,
                sr: sr,
                ok: ok,
                up: up,
                st: st
            };


        }


    });
})(Function('return this')());

(function (global) {

    global.App.Controller('person', './components/person/', function ($scope, _update) {
        var PersonModel = global.App.getModel('PersonModel');
        /** Creating  the Person controller which will control the person view*/
        $scope.fullNameLabel = 'Full Name: ';
        $scope.fullName = null;
        $scope.age = null;
        $scope.proffesion = null;
        $scope.BMI = null;
        $scope.childWeight = null;
        $scope.childHeight = null;
        $scope.month = null;

        $scope.height = 0;
        $scope.weight = 0;
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.birthday = '';
        $scope.profession = '';

        $scope.inputFocusout = function () {
            switch (this.name) {
                case 'firstName':
                    $scope.firstName = this.value;
                    this.size = 40;
                    break;
                case 'lastName':
                    this.bold = '';
                    $scope.lastName = this.value;
                    break;
                case 'birthday':
                    $scope.birthday = this.value;
                    break;
                case 'profession':
                    $scope.profession = this.value;
                    break;
                case 'height':
                    $scope.height = this.value;
                    break;
                case 'month':
                    $scope.month = this.value;
                    break;


            }
            console.log('person:inputFocusout', this.name, this.value, this.size, this.bold);
            _update();
        };
        $scope.calculateResult = function () {
            $scope.fullName = PersonModel.getPersonFullName($scope.firstName, $scope.lastName);
            var parts = $scope.birthday.split(',');
            $scope.age = PersonModel.getPersonAge(new Date(parts[0], parts[1], parts[2]));
            $scope.proffesion = PersonModel.getPersonProfession($scope.profession);
            $scope.BMI = PersonModel.getPersonBMI($scope.weight, $scope.height);
            $scope.month = PersonModel.getBabyInfo($scope.childWeight, $scope.childHeight, $scope.month);
            _update();
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