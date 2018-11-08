(function (global) {

    global.App.Controller('user-info', './components/user-info/', function ($scope, _update) {
        var UserInfoModel = global.App.getModel('UserInfoModel');
        $scope.userInfo = false;
        $scope.value = false;
        $scope.message = '';
        $scope.term = false;



        /**On that part here we make a transformation from text to object, in order to use them from catching from the key  and use the informations*/
        UserInfoModel.getUserInfo(function (userInfo) {
            var results = {}, arr = userInfo.split('\n').filter(Boolean), parts;
            for (var i in arr) {
                parts = arr[i].split(':');
                results[parts[0]] = parts[1];
            }
            $scope.userInfo = results;
            console.log('//////', $scope.userInfo);
            /** On that part we make an the user-info our results, so we take that info that we want */
            _update();
        });

        /** On that section we catch userInfo and we put it a value that its $scope,term=this.value. Also we can write the message */
        $scope.eventClicked = function () {
            $scope.message = $scope.userInfo[$scope.term];

            if (!$scope.userInfo[$scope.term]) {
                $scope.message = 'You should enter the right entity';
            }

            _update();
        };

        $scope.inputFocusout = function () {
            console.log('user-info:inputFocusout', this.value);
            $scope.term = this.value;
            _update();
        };


    });
})(Function('return this')());
