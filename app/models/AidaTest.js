(function (global) {

    global.App.Model('AidaTest', function (setData) {

        // function for multiplication
        this.getCalMultiplication = function (n1, n2) {
            var res = n1 * n2;
            return res;
        };

        // function for division
        this.getCalDivision = function (n1, n2) {
            var res = n1 / n2;
            return res;
        };

    });

})(Function('return this')());
