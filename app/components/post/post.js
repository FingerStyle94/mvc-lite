(function (global) {

    global.App.Controller('post', './components/post/', function ($scope, _update) {
        var PostModel = global.App.getModel('PostModel');


        $scope.title = null;
        $scope.body = null;


        $scope.title = '';
        $scope.body = '';

        $scope.inputOut = function () {
            switch (this.name) {
                case 'title':
                    $scope.title = this.value;
                    break;
                case 'body':
                    $scope.body = this.value;
                    break;


            }
            console.log('post:inputOut', this.name, this.value, this.size, this.bold);
            _update();
        };
        $scope.Posto = function () {
            $scope.title = PostModel.getPostTitle($scope.title);
            $scope.body = PostModel.getPostBody($scope.body);

            _update();
        }
    });
})(Function('return this')());
