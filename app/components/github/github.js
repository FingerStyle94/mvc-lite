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

        function processResults(results) {
            var data = [];
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
                        id: results.items[i].id,
                        score: results.items[i].score,
                        name: results.items[i].name,
                        forks: results.items[i].forks
                    });
                }
            }
           // data = results.items;
            return {
                data: data,
                type: $scope.entity,
                term: $scope.term
            };
        }
    });
})(Function('return this')());
