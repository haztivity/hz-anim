(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core/index", "./6611.html!text", "../../../../../src/HzAnim"], factory);
    }
})(function (require, exports) {
    "use strict";
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var index_1 = require("@haztivity/core/index");
    var template = require("./6611.html!text");
    var HzAnim_1 = require("../../../../../src/HzAnim");
    var page = index_1.PageFactory.createPage({
        name: "6611",
        resources: [
            HzAnim_1.HzAnim
        ],
        template: template
    });
    exports.page6611 = page;
    page.on(index_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
        console.log(pageController.options.name + " rendering");
    });
    page.on(index_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " rendered");
    });
    page.on(index_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show start");
    });
    page.on(index_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show end");
    });
    page.on(index_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
        console.log(pageController.options.name + " complete change");
    });
    page.on(index_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " destroy");
    });
});
//# sourceMappingURL=6611.js.map