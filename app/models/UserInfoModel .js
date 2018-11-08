(function (global) {

    global.App.Model('UserInfoModel', function (setData) {
        this.getUserInfo = function (callback) {
            console.log(callback);
            /** On that part we make exactly a change on the header and options of Http format in order to make a connection of .txt, not only .json */

            global.Utils.Http.get('https://ip.nf/me.txt', {
                options: {plainText: true},
                headers: {"Content-Type": "text/plain"}
            }, function (response) {

                console.log('UserInfoModel:getUserInfo', response);
                callback(response);
                setData(response);
            });
        };

    });

})(Function('return this')());
