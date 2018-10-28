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
