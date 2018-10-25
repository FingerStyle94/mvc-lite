(function (global) {

    global.App.Model('PersonModel', function (setData) {
        /** Creating  the PersonModel which will control the person component*/

        this.getPersonFullName = function (firstName, lastName) {
            return firstName + ' ' + lastName + ' ' + ' ';
        };
        this.getPersonAge = function (birthday) {
            let diff_ms = Date.now() - birthday.getTime();
            let age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);

        };
    });

})(Function('return this')());
