"use strict";
var Express = require('express');
var App = /** @class */ (function () {
    function App() {
        var _this = this;
        this.app = Express();
        this.port = 4000;
        this.app.use(require('body-parser').json());
        this.routes();
        this.app.listen(process.env.PORT || this.port, function () {
            console.log("Listening Port " + (_this.port || process.env.PORT));
        });
    }
    App.prototype.routes = function () {
        this.app.use(require('./routes/routing'));
    };
    return App;
}());
