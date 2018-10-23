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