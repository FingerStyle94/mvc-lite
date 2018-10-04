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
