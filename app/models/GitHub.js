(function (global) {

    global.App.Model('GitHub', function (setData) {
        var Api = "https://api.github.com/search/";
        this.entities = ['repositories', 'users'];

        /**
         * This function is used to get Data from GitHub
         * @param path string This parameter is used to switch between entities, Eg: 'repositories', 'users'...
         * @param params object This parameter is used to send params through query string, Eg: {q: 'rexhinaIdobet'}
         * @param callback function This parameter is used to handle the response
         */
        this.getGitHubData = function (path, params, callback) {
            console.log(path, params, callback);
            global.Utils.Http.get(Api + path, {params: params}, function (response) {
                console.log('GitHub:getGitHubData', response);
                callback(response);
                setData(response);
            });
        };

    });

})(Function('return this')());
