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
