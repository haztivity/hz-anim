(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core/index", "./pages/6611/6611"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("@haztivity/core/index");
    var _6611_1 = require("./pages/6611/6611");
    var sco = index_1.ScoFactory.createSco({
        name: "1221",
        pages: [
            _6611_1.page6611
        ],
        components: []
    });
    //pageChangeStart
    sco.on();
    //pageChangeEnd
    sco.on();
    //pageComplete
    sco.on();
    //sco end
    sco.on();
    //error
    sco.on();
    sco.run();
});
//# sourceMappingURL=index.js.map