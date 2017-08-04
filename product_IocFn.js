var G_Ioc = (function () {
    function IocFn() { }
    IocFn.prototype.SingleFn = function () {
        var sm = new SingleModule();
        return sm;
    }
    IocFn.prototype.GlobalFn = function () {
        var gm = new GlobalModule();
        return gm;
    }
    IocFn.prototype.DomFn = function (o) {
        return new Dom_Select(o);
    }

    // 单例
    var instance;
    var _static = {
        getInstance: function () {
            if (instance === undefined) {
                instance = new IocFn();
            }
            return instance;
        }
    };
    return _static;
})();
