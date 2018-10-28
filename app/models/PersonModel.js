(function (global) {

    global.App.Model('PersonModel', function (setData) {
        /** Creating  the PersonModel which will control the person component*/

        this.getPersonFullName = function (firstName, lastName) {
            return firstName + ' ' + lastName + ' ' + ' ';
        };
        this.getPersonAge = function (birthday) {
            var diff_ms = Date.now() - birthday.getTime();
            var age_dt = new Date(diff_ms);
            return Math.abs(age_dt.getUTCFullYear() - 1970);
        };
        this.getPersonProfession = function (profession) {
            return profession;
        };
        this.getPersonBMI = function (weight, height) {
            height *= 12;
            var BMI = (weight / (height * height)) * 703;
            return Math.round(BMI * Math.pow(10, 2)) / Math.pow(10, 2);
        };
        this.getBabyInfo = function (month) {
            var childWeight, childHeight;
            if (month === 'month1') {
                childWeight = '3.3 - 5kg';
                childHeight = '48-58 cm';
            } else if (month === 'month2') {
                childWeight = '4-6 kg';
                childHeight = '53-60 cm';
            }
            else if (month === 'month3') {
                childWeight = '4.5-7 kg';
                childHeight = '57-65 cm';
            }
            else if (month === 'month4') {
                childWeight = '5.5-8 kg';
                childHeight = '59-66 cm';
            }
            return childHeight + childWeight;
        };
    });

})(Function('return this')());
