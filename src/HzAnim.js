(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./HzAnimResource", "./HzAnimResource"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var HzAnimResource_1 = require("./HzAnimResource");
    exports.HzAnimResource = HzAnimResource_1.HzAnimResource;
    /**
     * @deprecated
     */
    var HzAnimResource_2 = require("./HzAnimResource");
    exports.HzAnim = HzAnimResource_2.HzAnimResource;
});
//# sourceMappingURL=HzAnim.js.map