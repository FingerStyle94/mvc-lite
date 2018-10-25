(function (global) {

    global.App.Controller('person', './components/person/', function ($scope, _update) {
        var PersonModel = global.App.getModel('PersonModel');
        /** Creating  the Person controller which will control the person view*/
        $scope.fullNameLabel = 'Full Name: ';
        $scope.fullName = null;
        $scope.age = null;

        $scope.firstName = '';
        $scope.lastName = '';
        $scope.birthday = '';

        $scope.inputFocusout = function () {
            switch (this.name) {
                case 'firstName':
                    $scope.firstName = this.value;
                    this.size = 40;
                    break;
                case 'lastName':
                    $scope.lastName = this.value;
                    break;
                case 'birthday':
                    $scope.birthday = this.value;
                    this.disabled = true;
                    break;
            }
            console.log('person:inputFocusout', this.name, this.value);
            _update();
        };
        $scope.calculateResult = function () {
            $scope.fullName = PersonModel.getPersonFullName($scope.firstName, $scope.lastName);
            var parts = $scope.birthday.split(',');
            $scope.age = PersonModel.getPersonAge(new Date(parts[0], parts[1], parts[2]));
            _update();
        }
    });
})(Function('return this')());
