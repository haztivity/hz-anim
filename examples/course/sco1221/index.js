(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./sco.pug", "./main.scss", "./markdown.scss", "@haztivity/core", "@haztivity/hz-navbar", "./pages/6611/page", "./pages/6612/page", "./pages/6613/page"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var sco_pug_1 = require("./sco.pug");
    require("./main.scss");
    require("./markdown.scss");
    var core_1 = require("@haztivity/core");
    var hz_navbar_1 = require("@haztivity/hz-navbar");
    var page_1 = require("./pages/6611/page");
    var page_2 = require("./pages/6612/page");
    var page_3 = require("./pages/6613/page");
    var sco = core_1.ScoFactory.createSco({
        name: "1221",
        template: sco_pug_1.default,
        pages: [
            page_1.page,
            page_2.page,
            page_3.page
        ],
        components: [
            hz_navbar_1.HzNavbarComponent
        ]
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