(function (global) {
    global.App.Controller('employeed','./components/employeed/',function ($scope,_update) {
        var EmployeedModel = global.App.getModel('Employeed');
        $scope.fullNameLabel = 'Full Name: ';
        $scope.fullName = null;
        $scope.proffesion = null;
        $scope.firstName = '';
        $scope.lastName = '';
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

                case 'profession':
                    $scope.profession = this.value;
                    break;

            }
            console.log('employeed:inputFocusout', this.name, this.value, this.size, this.bold);
            _update();

    };
        $scope.showData= function () {
            $scope.fullName = EmployeedModel.getEmployeedFullName($scope.firstName, $scope.lastName);
            $scope.proffesion = EmployeedModel.getEmployeedProfession($scope.profession);
            _update();
        }
});
})(Function('return this')());