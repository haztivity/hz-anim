(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@haztivity/core", "./page.pug", "../../../resources/hzanim/HzAnim"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    /**
     * @license
     * Copyright Davinchi. All Rights Reserved.
     */
    var core_1 = require("@haztivity/core");
    var page_pug_1 = require("./page.pug");
    /**
     * use import {HzAnimResource} from "@haztivity/hz-anim"
     */
    var HzAnim_1 = require("../../../resources/hzanim/HzAnim");
    exports.page = core_1.PageFactory.createPage({
        name: "6613",
        title: "Multiple targets",
        resources: [
            HzAnim_1.HzAnimResource
        ],
        template: page_pug_1.default,
        autoSequence: false
    });
    exports.page.on(core_1.PageController.ON_RENDERING, null, function (eventObject, template, pageController) {
        console.log(pageController.options.name + " rendering");
    });
    exports.page.on(core_1.PageController.ON_RENDERED, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " rendered");
        $page.find('pre code').each(function (i, block) {
            hljs.highlightBlock(block);
        });
    });
    exports.page.on(core_1.PageController.ON_SHOW, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show start");
    });
    exports.page.on(core_1.PageController.ON_SHOWN, null, function (eventObject, $page, $oldPage, oldPageRelativePosition, pageController) {
        console.log(pageController.options.name + " show end");
    });
    exports.page.on(core_1.PageController.ON_COMPLETE_CHANGE, null, function (eventObject, isCompleted, $page, pageController) {
        console.log(pageController.options.name + " complete change");
    });
    exports.page.on(core_1.PageController.ON_DESTROY, null, function (eventObject, $page, pageController) {
        console.log(pageController.options.name + " destroy");
    });
});
//# sourceMappingURL=page.js.map