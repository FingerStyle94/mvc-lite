(function (global) {

    global.App.Model('PostModel', function (setData) {



        this.getPostTitle = function (title) {
            return title;
        };
        this.getPostBody = function (body) {
            return body;
        };
    });

})(Function('return this')());
