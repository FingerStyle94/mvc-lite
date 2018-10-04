(function (global) {

    global.App.Model('TestModel', function (setData) {

        this.getClientInfo = function (callback) {
            console.log(callback);
            global.Utils.Http.get('https://ip.nf/me.json', {}, function (response) {
                console.log('TestModel:getClientInfo', response);
                callback(response.ip);
                setData(response.ip);
            });
        };

        this.prova = gciTest;

        function gciTest() {
            console.log('TestModel:gciTest');
            return 'rehims';
        }


    });

})(Function('return this')());
